import sys
import grpc

# import the generated classes
import service.service_spec.time_series_forecast_pb2_grpc as grpc_bt_grpc
import service.service_spec.time_series_forecast_pb2 as grpc_bt_pb2

from service import registry

if __name__ == "__main__":

    try:
        test_flag = False
        if len(sys.argv) == 2:
            if sys.argv[1] == "auto":
                test_flag = True

        # Service ONE - Arithmetic
        endpoint = input("Endpoint (localhost:{}): ".format(registry["time_series_forecast_service"]["grpc"])) if not test_flag else ""
        if endpoint == "":
            endpoint = "localhost:{}".format(registry["time_series_forecast_service"]["grpc"])

        # Open a gRPC channel
        channel = grpc.insecure_channel("{}".format(endpoint))

        grpc_method = input("Method (forecast): ") if not test_flag else ""
        if grpc_method == "":
            grpc_method = "forecast"

        model_file = input("Model File (LSTM_Fonio.model): ") if not test_flag else ""
        if model_file == "":
            model_file = "LSTM_Fonio.model"

        num_points = input("Number of Points (5): ") if not test_flag else ""
        if num_points == "":
            num_points = 5

        input_dim = input("Input Dim (14): ") if not test_flag else ""
        if input_dim == "":
            input_dim = 14

        if grpc_method == "forecast":
            stub = grpc_bt_grpc.ForecastStub(channel)
            request = grpc_bt_pb2.Input(num_points=int(num_points),
                                        input_dim=int(input_dim))
            response = stub.forecast(request)
            print("\nresponse:")
            print("output_points           : {}".format(response.output_points))
        else:
            print("Invalid method!")
            exit(1)

    except Exception as e:
        print(e)
        exit(1)
