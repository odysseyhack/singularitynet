FROM opencog/opencog-deps

RUN git clone --depth=1 https://github.com/singnet/cogutil
RUN cd cogutil && mkdir build && cd build \
		&& cmake .. && make -j4 && make install

RUN git clone --depth=1 https://github.com/singnet/atomspace
RUN cd atomspace && mkdir build && cd build \
		&& cmake .. && make -j4 && make install

RUN mkdir -p singularitynet

ENV PYTHONPATH=/usr/local/lib/python3/dist-packages
