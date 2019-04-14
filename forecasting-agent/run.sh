#!/bin/sh

PWD=`pwd`
REPO=`dirname ${PWD}`

docker run \
	-v ${REPO}:/project/singularitynet \
	--network "host" \
	-ti forecaster-agent \
	python3 ./singularitynet/forecasting-agent/forecasting-agent.py --oracle-endpoint localhost:9000 --period-seconds 10
