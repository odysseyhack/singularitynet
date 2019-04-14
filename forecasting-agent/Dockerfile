FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y libudev-dev
RUN apt-get install -y libusb-1.0-0-dev

RUN mkdir -p project
WORKDIR project

RUN git clone --depth=1 --single-branch \
	--branch fix-rename-tmp-between-different-filesystems \
	https://github.com/vsbogd/snet-cli \
	./snet-cli
WORKDIR snet-cli
RUN ./scripts/blockchain install
RUN pip3 install -e .

WORKDIR ..
RUN mkdir -p ./singularitynet/
RUN pip3 install grpcio

RUN snet identity create user mnemonic --mnemonic "MY_MNEMONIC"
RUN snet network ropsten
