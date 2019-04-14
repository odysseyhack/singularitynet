// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var oracle_pb = require('./oracle_pb.js');

function serialize_ForecasterFetchDataReply(arg) {
  if (!(arg instanceof oracle_pb.ForecasterFetchDataReply)) {
    throw new Error('Expected argument of type ForecasterFetchDataReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ForecasterFetchDataReply(buffer_arg) {
  return oracle_pb.ForecasterFetchDataReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ForecasterFetchDataRequest(arg) {
  if (!(arg instanceof oracle_pb.ForecasterFetchDataRequest)) {
    throw new Error('Expected argument of type ForecasterFetchDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ForecasterFetchDataRequest(buffer_arg) {
  return oracle_pb.ForecasterFetchDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ForecasterPushDataReply(arg) {
  if (!(arg instanceof oracle_pb.ForecasterPushDataReply)) {
    throw new Error('Expected argument of type ForecasterPushDataReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ForecasterPushDataReply(buffer_arg) {
  return oracle_pb.ForecasterPushDataReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ForecasterPushDataRequest(arg) {
  if (!(arg instanceof oracle_pb.ForecasterPushDataRequest)) {
    throw new Error('Expected argument of type ForecasterPushDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ForecasterPushDataRequest(buffer_arg) {
  return oracle_pb.ForecasterPushDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ForecasterService = exports.ForecasterService = {
  forecasterFetchData: {
    path: '/Forecaster/ForecasterFetchData',
    requestStream: false,
    responseStream: false,
    requestType: oracle_pb.ForecasterFetchDataRequest,
    responseType: oracle_pb.ForecasterFetchDataReply,
    requestSerialize: serialize_ForecasterFetchDataRequest,
    requestDeserialize: deserialize_ForecasterFetchDataRequest,
    responseSerialize: serialize_ForecasterFetchDataReply,
    responseDeserialize: deserialize_ForecasterFetchDataReply,
  },
  forecasterPushData: {
    path: '/Forecaster/ForecasterPushData',
    requestStream: false,
    responseStream: false,
    requestType: oracle_pb.ForecasterPushDataRequest,
    responseType: oracle_pb.ForecasterPushDataReply,
    requestSerialize: serialize_ForecasterPushDataRequest,
    requestDeserialize: deserialize_ForecasterPushDataRequest,
    responseSerialize: serialize_ForecasterPushDataReply,
    responseDeserialize: deserialize_ForecasterPushDataReply,
  },
};

exports.ForecasterClient = grpc.makeGenericClientConstructor(ForecasterService);
