import argparse
import time

import grpc
import oracle_pb2
import oracle_pb2_grpc

from snet_cli.sdk import Session, Client, AutoFundingFundingStrategy
from snet_cli.config import Config

def parse_arguments():
    parser = argparse.ArgumentParser(description = 'Forecasting agent use ' +
            'SingularityNET forecasting service to predict gas consumption ' +
            'and publish it via oracle service.')
    parser.add_argument('--oracle-endpoint', help = 'Oracle endpoint')
    parser.add_argument('--period-seconds', help = 'Time period to get data ' +
            'from the service and push it to the oracle in seconds');
    return parser.parse_args()

def get_forecasting_producer():
    session = Session(Config())
    client = Client(session, "snet", "cntk-lstm-forecast", AutoFundingFundingStrategy(amount_cogs = 10, expiration = "+10days"))
    return client

def send_data(producer, consumer):
    input = producer.classes.Input(
                window_len = 20,
                word_len = 5,
                alphabet_size = 5,
                source_type = 'financial',
                source = 'yahoo',
                contract = 'AMZN',
                start_date = "2017-01-01",
                end_date = "2018-12-10"
            )
    output = producer.stub.forecast(input)
    print('output:', output)

def run():
    args = parse_arguments()
    with grpc.insecure_channel(args.oracle_endpoint) as channel:
        forecasting_consumer = oracle_pb2_grpc.ForecasterStub(channel)
        forecasting_producer = get_forecasting_producer()
        while True:
            send_data(forecasting_producer, forecasting_consumer)
            time.sleep(args.period_seconds)


if __name__ == '__main__':
    run()
