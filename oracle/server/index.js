'use strict'

const grpc      = require("grpc")
const services  = require("./../protos/build/js/oracle_grpc_pb.js")

const {
  meterPushData,
  forecasterPushData,
  carbonPushData,
  toReply
} = require("./handlers")

function main() {
  const server = new grpc.Server()
  server.addService(services.MeterService, { 
    "meterPushData": (call, callback) => callback(null, toReply(call)),
    "forecasterPushData": (call, callback) => callback(null, toReply(call)),
    "carbonPushData": (call, callback) => callback(null, toReply(call)), 
  })


  //Bind server
  server.bind("0.0.0.0:9000", grpc.ServerCredentials.createInsecure())
  server.start()
}

main()