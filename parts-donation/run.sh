#!/bin/sh

PWD=`pwd`
REPO=`dirname ${PWD}`

docker run \
	-v $REPO:/home/opencog/singularitynet \
	-ti parts-donation \
	python /home/opencog/singularitynet/parts-donation/parts-donation.py
