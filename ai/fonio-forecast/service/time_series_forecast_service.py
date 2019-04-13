import sys
import time
import logging

from matplotlib import pyplot as plt
import numpy as np

import grpc
import concurrent.futures as futures

import service.common
from service.time_series_forecast import Forecast

# Importing the generated codes from buildproto.sh
import service.service_spec.time_series_forecast_pb2_grpc as grpc_bt_grpc
from service.service_spec.time_series_forecast_pb2 import Output

logging.basicConfig(level=10, format="%(asctime)s - [%(levelname)8s] - %(name)s - %(message)s")
log = logging.getLogger("time_series_forecast")

GPU_DEVICE_BUSY = False
GPU_QUEUE = []
GPU_QUEUE_ID = -1


# Create a class to be added to the gRPC server
# derived from the protobuf codes.
class ForecastServicer(grpc_bt_grpc.ForecastServicer):
    def __init__(self):
        # LSTM pre-trained Model
        self.model_file = ""
        self.csv_file = "fonio.csv"
        self.input_dim = 0
        
        # Number of points to forecast
        self.num_points = 0
        
        self.response = ""
        log.debug("ForecastServicer created")

    # The method that will be exposed to the snet-cli call command.
    # request: incoming data
    # context: object that provides RPC-specific information (timeout, etc).
    def forecast(self, request, context):
        gpu_queue_id = get_gpu_queue_id()
        try:
            # Wait to use GPU (max: 1h)
            count = 0
            while GPU_DEVICE_BUSY or GPU_QUEUE[0] != gpu_queue_id:
                time.sleep(1)
                if count % 60 == 0:
                    log.debug("[Client: {}] GPU is being used by [{}], waiting...".format(gpu_queue_id, GPU_QUEUE[0]))
                count += 1
                if count > 60 * 60:
                    self.response = Output()
                    self.response.output_points = "GPU Busy"
                    return self.response

            # Lock GPU usage
            acquire_gpu(gpu_queue_id)

            # In our case, request is a Input() object (from .proto file)
            self.model_file = request.model_file
            self.num_points = request.num_points
            self.input_dim = request.input_dim
            
            # To respond we need to create a Output() object (from .proto file)
            self.response = Output()

            fc = Forecast(self.model_file,
                          self.csv_file,
                          self.input_dim)

            y_data, predictions = fc.forecast(self.num_points)
            # plot_predictions(y_data, predictions)

            response = dict()
            for idx, point in enumerate(predictions):
                response["points"].append(point)

            self.response.output_points = str(response).encode("utf-8")

            log.debug("forecast({},{}) = {}".format(self.model_file,
                                                    self.num_points,
                                                    self.response.output_points))

            # Unlock GPU usage
            release_gpu(gpu_queue_id)
            return self.response

        except Exception as e:
            log.error(e)
            if gpu_queue_id == GPU_QUEUE[0]:
                release_gpu(gpu_queue_id)
            else:
                remove_from_queue(gpu_queue_id)
            self.response = Output()
            self.response.output_points = "Fail"
            return self.response


def get_gpu_queue_id():
    global GPU_QUEUE
    global GPU_QUEUE_ID
    GPU_QUEUE_ID += 1
    GPU_QUEUE.append(GPU_QUEUE_ID)
    log.debug("[Client: {}]                  GPU_QUEUE     : {}".format(GPU_QUEUE_ID, GPU_QUEUE))
    return GPU_QUEUE_ID


def remove_from_queue(gpu_queue_id):
    global GPU_QUEUE
    GPU_QUEUE.remove(gpu_queue_id)


def acquire_gpu(gpu_queue_id):
    global GPU_DEVICE_BUSY
    global GPU_QUEUE
    GPU_DEVICE_BUSY = True
    log.debug("[Client: {}] Acquiring GPU (GPU_DEVICE_BUSY): {}".format(gpu_queue_id, GPU_DEVICE_BUSY))


def release_gpu(gpu_queue_id):
    global GPU_DEVICE_BUSY
    remove_from_queue(gpu_queue_id)
    GPU_DEVICE_BUSY = False
    log.debug("[Client: {}] Releasing GPU (GPU_DEVICE_BUSY): {}".format(gpu_queue_id, GPU_DEVICE_BUSY))
    log.debug("[Client: {}]                  GPU_QUEUE     : {}".format(gpu_queue_id, GPU_QUEUE))


def plot_predictions(test_data, predictions):
    """Plot a Chart with Real and Predicted Lines"""
    f, a = plt.subplots(1, 1, figsize=(12, 8))
    a.plot(test_data.flatten(), label="Fonio Prod real")
    a.plot(np.array(predictions), label="Fonio Prod pred")
    a.legend()
    plt.show()


# The gRPC serve function.
#
# Params:
# max_workers: pool of threads to execute calls asynchronously
# port: gRPC server port
#
# Add all your classes to the server here.
# (from generated .py files by protobuf compiler)
def serve(max_workers=10, port=7777):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))
    grpc_bt_grpc.add_ForecastServicer_to_server(ForecastServicer(), server)
    server.add_insecure_port("[::]:{}".format(port))
    return server


if __name__ == "__main__":
    """
    Runs the gRPC server to communicate with the Snet Daemon.
    """
    parser = service.common.common_parser(__file__)
    args = parser.parse_args(sys.argv[1:])
    service.common.main_loop(serve, args)
