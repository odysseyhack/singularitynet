import argparse

import grpc
import oracle_pb2
import oracle_pb2_grpc

def parse_arguments():
    parser = argparse.ArgumentParser(description = 'Forecasting agent use ' +
            'SingularityNET forecasting service to predict gas consumption ' +
            'and publish it via oracle service.')
    parser.add_argument('--oracle_endpoint', help = 'Oracle endpoint')
    return parser.parse_args()

def run():
    args = parse_arguments()
    with grpc.insecure_channel(args.oracle_endpoint) as channel:
        forecastingAPI = oracle_pb2_grpc.ForecasterStub(channel)

if __name__ == '__main__':
    run()
