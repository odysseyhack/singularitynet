import argparse
import time
import logging as log

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
    parser.add_argument('--period-seconds', type = int,
            help = 'Time period to get data from the service and push it ' +
            'to the oracle in seconds');
    return parser.parse_args()

def get_forecasting_producer():
    log.info('open connection to forecasting service')
    config = Config()
    log.info('SingularityNET platform config: %s' % config)
    session = Session(config)
    log.info('SingularityNET platform session: %s' % session)
    client = Client(session, "snet", "fonio-forecast", AutoFundingFundingStrategy(amount_cogs = 10, expiration = "+10days"))
    log.info('SingularityNET platform client: %s' % client)
    return client

def now():
    return int(time.time())


class DataPump:

    def __init__(self, producer, consumer, period):
        self.producer = producer
        self.consumer = consumer
        self.period = period
        self.position = 1

    def get_prediction(self):
        log.info('pull data from forecasting service')
        input = self.producer.classes.Input(
                    num_points = 1 + int(self.position / 14),
                    input_dim = 14
                )
        log.info('input: %s' % input)
        output = self.producer.stub.forecast(input)
        log.info('data received: %s' % output)
        return output.output_points[self.position - 1]

    def send_prediction(self, value):
        log.info('push data to oracle')
        signature = None # TODO: check with Marco
        community = 'fonio'
        request = oracle_pb2.ForecasterPushDataRequest(
                timeframe = oracle_pb2.Timeframe(
                    unixStart = self.unixStart,
                    unixEnd = self.unixEnd),
                value = value,
                signature = signature,
                community = community)
        log.info('forecasting request for oracle: %s' % request)
        reply = self.consumer.ForecasterPushData(request)
        log.info('reply from oracle: %s' % reply)
        if not reply.success:
            log.error('could not push data to oracle, reply: %s' %reply)

    def run(self):
        self.unixStart = now() - self.period
        while True:
            self.unixEnd = now()
            try:
                value = self.get_prediction()
                self.send_prediction(value)
            except Exception as e:
                log.exception('exception in the main loop')
            self.unixStart = self.unixEnd
            self.position += 1

            log.info('sleep for %d seconds' % self.period)
            time.sleep(self.period)

def run():
    log.basicConfig(level=log.INFO)

    args = parse_arguments()
    log.info('args: %s' % args)

    with grpc.insecure_channel(args.oracle_endpoint) as channel:
        log.info('gRPC channel: %s', channel)
        forecasting_consumer = oracle_pb2_grpc.ForecasterStub(channel)
        forecasting_producer = get_forecasting_producer()
        data_pump = DataPump(forecasting_producer, forecasting_consumer,
                              args.period_seconds)
        data_pump.run()


if __name__ == '__main__':
    run()
