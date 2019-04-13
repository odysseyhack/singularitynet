'use strict'

const messages = require("./../protos/build/js/oracle_pb.js")


function toReply(call) {
  const reply = new messages.Reply();
  reply.setSuccess(true)
  return reply;
}

function meterPushData() {

}

function forecasterPushData() {

}

function carbonPushData() {

}

module.exports = {
  toReply,
  meterPushData,
  forecasterPushData,
  carbonPushData
}

