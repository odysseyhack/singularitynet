#!/bin/sh
ROOT=..
python -m grpc_tools.protoc -I${ROOT}/oracle/protos --python_out=.  --grpc_python_out=. ${ROOT}/oracle/protos/oracle.proto
