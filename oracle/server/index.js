'use strict'

const grpc      = require("grpc")
const services  = require("./../protos/build/js/oracle_grpc_pb.js")

const {
  forecasterPushData,
  forecasterFetchData
} = require("./handlers")

function start() {
  const server = new grpc.Server()
  server.addService(services.ForecasterService, { 
    "forecasterPushData": forecasterPushData,
    "forecasterFetchData": forecasterFetchData
  });


  //Bind server
  server.bind("0.0.0.0:9000", grpc.ServerCredentials.createInsecure())
  server.start()
  console.log('Starting server on 9000')
}

module.exports = start;