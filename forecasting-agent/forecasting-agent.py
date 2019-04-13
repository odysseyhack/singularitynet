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

def send_data(unixStart, unixEnd, position, producer, consumer):
    log.info('pull data from forecasting service')
    input = producer.classes.Input(
                num_points = 1 + int(position / 14),
                input_dim = 14
            )
    log.info('input: %s' % input)
    output = producer.stub.forecast(input)
    log.info('data received: %s' % output)
    value = output.output_points[position - 1]

    log.info('push data to oracle')
    signature = None # TODO: check with Marco
    community = 'fonio'
    request = oracle_pb2.ForecasterPushDataRequest(
            timeframe = oracle_pb2.Timeframe(
                unixStart = unixStart,
                unixEnd = unixEnd),
            value = value,
            signature = signature,
            community = community)
    log.info('forecasting request for oracle: %s' % request)
    reply = consumer.ForecasterPushData(request)
    log.info('reply from oracle: %s' % reply)
    if not reply.success:
        log.error('could not push data to oracle, reply: %s' %reply)

def now():
    return int(time.time())

def run():
    log.basicConfig(level=log.INFO)

    args = parse_arguments()
    log.info('args: %s' % args)

    with grpc.insecure_channel(args.oracle_endpoint) as channel:
        log.info('gRPC channel: %s', channel)
        forecasting_consumer = oracle_pb2_grpc.ForecasterStub(channel)
        forecasting_producer = get_forecasting_producer()

        # main loop
        period = args.period_seconds
        unixStart = now() - period
        position = 1
        while True:
            unixEnd = now()
            try:
                send_data(unixStart, unixEnd, position, forecasting_producer, forecasting_consumer)
            except Exception as e:
                log.exception('exception in the main loop')
            unixStart = unixEnd
            position += 1

            log.info('sleep for %d seconds' % period)
            time.sleep(period)


if __name__ == '__main__':
    run()
