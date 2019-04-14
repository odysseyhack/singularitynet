from opencog.atomspace import AtomSpace
from opencog.utilities import initialize_opencog, finalize_opencog
from opencog.type_constructors import *
from opencog.bindlink import execute_atom
import logging as log
import json
from snet_cli.sdk import Session, Client, AutoFundingFundingStrategy
from snet_cli.config import Config

map_names = {
    0: "person",
    1: "bicycle",
    2: "car",
    3: "motorcycle",
    4: "airplane",
    5: "bus",
    6: "train",
    7: "truck",
    8: "boat",
    9: "traffic light",
    10: "fire hydrant",
    11: "stop sign",
    12: "parking meter",
    13: "bench",
    14: "bird",
    15: "cat",
    16: "dog",
    17: "horse",
    18: "sheep",
    19: "cow",
    20: "elephant",
    21: "bear",
    22: "zebra",
    23: "giraffe",
    24: "backpack",
    25: "umbrella",
    26: "handbag",
    27: "tie",
    28: "suitcase",
    29: "frisbee",
    30: "skis",
    31: "snowboard",
    32: "sports ball",
    33: "kite",
    34: "baseball bat",
    35: "baseball glove",
    36: "skateboard",
    37: "surfboard",
    38: "tennis racket",
    39: "bottle",
    40: "wine glass",
    41: "cup",
    42: "fork",
    43: "knife",
    44: "spoon",
    45: "bowl",
    46: "banana",
    47: "apple",
    48: "sandwich",
    49: "orange",
    50: "broccoli",
    51: "carrot",
    52: "hot dog",
    53: "pizza",
    54: "donut",
    55: "cake",
    56: "chair",
    57: "couch",
    58: "potted plant",
    59: "bed",
    60: "dining table",
    61: "toilet",
    62: "tv",
    63: "laptop",
    64: "mouse",
    65: "remote",
    66: "keyboard",
    67: "cell phone",
    68: "microwave",
    69: "oven",
    70: "toaster",
    71: "sink",
    72: "refrigerator",
    73: "book",
    74: "clock",
    75: "vase",
    76: "scissors",
    77: "teddy bear",
    78: "hair drier",
    79: "toothbrush",
}

def define_knowledge_base():
    log.info('creating new knowledge base')
    EvaluationLink(
            PredicateNode('partof'),
            ListLink(
                ConceptNode('electric motor'),
                ConceptNode('refrigerator')
                ),
            TruthValue(1.0, 1.0)
            )

def query_parts_for_donation(device):
    query = BindLink(
            VariableNode("X"),
            EvaluationLink(
                PredicateNode('partof'),
                ListLink(
                    VariableNode('X'),
                    device
                    )
                ),
            VariableNode('X')
            )
    global space
    return execute_atom(space, query)

def get_yolo_service():
    log.info('open connection to forecasting service')
    config = Config()
    log.info('SingularityNET platform config: %s' % config)
    session = Session(config)
    log.info('SingularityNET platform session: %s' % session)
    client = Client(session, "snet", "yolov3-object-detection", AutoFundingFundingStrategy(amount_cogs = 10, expiration = "+10days"))
    log.info('SingularityNET platform client: %s' % client)
    return client

def detect_device(yolo):
    input = yolo.classes.Input(
                model = 'yolov3',
                img_path = 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/109/10942/10942869.jpg',
                confidence = '0.8'
            )
    log.info('input: %s' % input)
    output = yolo.stub.detect(input)
    #log.info('data received: %s' % output)
    devices = list(map(lambda x: ConceptNode(x),
                    map(lambda x: map_names[x], json.loads(output.class_ids))))
    log.info('list of devices: %s' % devices)
    return devices
    
def run():

    define_knowledge_base()
    yolo = get_yolo_service()
    devices = detect_device(yolo)
    for device in devices:
        parts = query_parts_for_donation(device)
        print('You could donate the following parts: %s' % parts)


if __name__ == '__main__':
    log.basicConfig(level=log.INFO)
    space = AtomSpace()
    initialize_opencog(space)
    run()
