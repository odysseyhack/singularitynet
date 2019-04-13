#!/bin/sh

ROOT=..

# compile protobuf
python -m grpc_tools.protoc -I${ROOT}/oracle/protos --python_out=.  \
	--grpc_python_out=. ${ROOT}/oracle/protos/oracle.proto

# install SingularityNET SDK
mkdir -p vendor
git clone --depth=1 --single-branch --branch new-sdk \
	git@github.com:astroseger/snet-cli.git \
	./vendor/snet-cli
pushd vendor/snet-cli
sudo apt-get install libudev-dev libusb-1.0-0-dev
./scripts/blockchain install
pip install -e .
popd
