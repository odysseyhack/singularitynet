FROM opencog/opencog-deps

RUN apt-get update
RUN apt-get install -y npm nodejs
RUN apt-get install -y libudev-dev
RUN apt-get install -y libusb-1.0-0-dev
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN sh Miniconda3-latest-Linux-x86_64.sh -b -p /home/miniconda
ENV PATH=/home/miniconda/bin/:$PATH
RUN pip install grpcio
RUN conda install -c anaconda python=3.6
RUN pip install cython

RUN git clone --depth=1 https://github.com/singnet/cogutil
RUN cd cogutil && mkdir build && cd build \
		&& cmake .. && make -j4 && make install

RUN git clone --depth=1 https://github.com/singnet/atomspace
RUN cd atomspace && mkdir build && cd build \
		&& cmake -DPYTHON_LIBRARY='/home/miniconda/lib/libpython3.6m.so' \
				 -DPYTHON_INCLUDE_DIR='/home/miniconda/include/python3.6m' \
				 -DPYTHON_EXECUTABLE=`which python` \
				 -DCYTHON_EXECUTABLE=`which cython` \
				 .. \
		&& make -j4 && make install

RUN git clone --depth=1 --single-branch \
	--branch fix-rename-tmp-between-different-filesystems \
	https://github.com/vsbogd/snet-cli \
	./snet-cli
WORKDIR snet-cli
RUN python ./scripts/blockchain install && pip install -e .
WORKDIR ..

RUN snet identity create user mnemonic --mnemonic "MY_MNEMONIC"
RUN snet network ropsten

RUN mkdir -p singularitynet
ENV PYTHONPATH=/usr/local/lib/python3/dist-packages
