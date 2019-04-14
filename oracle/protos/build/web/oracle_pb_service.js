// package: 
// file: oracle.proto

var oracle_pb = require("./oracle_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Meter = (function () {
  function Meter() {}
  Meter.serviceName = "Meter";
  return Meter;
}());

Meter.MeterPushData = {
  methodName: "MeterPushData",
  service: Meter,
  requestStream: false,
  responseStream: false,
  requestType: oracle_pb.MeterPushDataRequest,
  responseType: oracle_pb.Reply
};

exports.Meter = Meter;

function MeterClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MeterClient.prototype.meterPushData = function meterPushData(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Meter.MeterPushData, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.MeterClient = MeterClient;

var Forecaster = (function () {
  function Forecaster() {}
  Forecaster.serviceName = "Forecaster";
  return Forecaster;
}());

Forecaster.ForecasterPushData = {
  methodName: "ForecasterPushData",
  service: Forecaster,
  requestStream: false,
  responseStream: false,
  requestType: oracle_pb.ForecasterPushDataRequest,
  responseType: oracle_pb.Reply
};

exports.Forecaster = Forecaster;

function ForecasterClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ForecasterClient.prototype.forecasterPushData = function forecasterPushData(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Forecaster.ForecasterPushData, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ForecasterClient = ForecasterClient;

var Carbon = (function () {
  function Carbon() {}
  Carbon.serviceName = "Carbon";
  return Carbon;
}());

Carbon.CarbonPushData = {
  methodName: "CarbonPushData",
  service: Carbon,
  requestStream: false,
  responseStream: false,
  requestType: oracle_pb.CarbonPushDataRequest,
  responseType: oracle_pb.Reply
};

exports.Carbon = Carbon;

function CarbonClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CarbonClient.prototype.carbonPushData = function carbonPushData(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Carbon.CarbonPushData, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.CarbonClient = CarbonClient;

