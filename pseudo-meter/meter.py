from identity import KeyIdentityProvider
from pathlib import Path
from web3 import Web3
from gas_consumption_generator import GasConsumptionGenerator

import json
import web3
import time
import grpc
import oracle_pb2
import oracle_pb2_grpc


class Meter:
    def __init__(self):
        self.__load_config()
        provider = web3.HTTPProvider(self.config['ethereumRPCEndpoint'])
        w3 = web3.Web3(provider)
        self.identity = KeyIdentityProvider(w3, self.config['privateKey'])

    def __load_config(self):
        config_file = Path('./config.json')
        if config_file.is_file():
            self.config = json.loads(config_file.read_text())
        else:
            raise Exception("Config file not found")

    def start(self):
        g = GasConsumptionGenerator()
        while True:
            self.post_reading(g.get_naive_value())
            time.sleep(self.config['frequency'])

    def post_reading(self, value):
        try:
            epoch = time.time()
            message = str(epoch) + str(int(value))
            signature = Web3.toHex(self.identity.sign_message(message))

            payload = oracle_pb2.MeterPushDataRequest(timestamp=int(epoch), signature=signature, value=value)

            print(payload.timestamp)
            print(payload.signature)
            print(payload.value)

            with grpc.insecure_channel('localhost:50051') as channel:
                stub = oracle_pb2_grpc.MeterStub(channel)
                response = stub.MeterPushData(payload)
                print("Response received: " + str(response.success))
        except Exception as e:
            print("Posting failed with error " + repr(e))


m = Meter()
m.start()
