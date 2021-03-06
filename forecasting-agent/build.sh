#!/bin/sh
PWD=`pwd`
REPO=`dirname ${PWD}`

pip install grpcio-tools
python -m grpc_tools.protoc -I${REPO}/oracle/protos --python_out=.  \
	--grpc_python_out=. oracle.proto

docker build -t forecaster-agent .
