'use strict'

const messages  = require("./../protos/build/js/oracle_pb.js");
const store     = require("../store");
const notary    = require("../notary");

function forecasterPushData(call, callback) {

  const timeframe = {};
  timeframe.start = call.request.getTimeframe().getUnixstart();
  timeframe.end = call.request.getTimeframe().getUnixend();
  const value = call.request.getValue();
  const community = call.request.getCommunity();


  //Store in the blockchain abstraction
  const obj = { timeframe, value, community };
  notary.stamp(new Buffer.from(JSON.stringify(obj), 'utf8')).then(({ots, hash}) => {
    store.insert({...obj, ots, hash});
    const reply = new messages.ForecasterPushDataReply();
    reply.setSuccess(true)

    callback(null, reply);
  });
}

function forecasterFetchData(_, callback) {
  store.find({}, (err, docs) => {

    if (err) { callback(err, null); return };

    let forecasts = docs.map(doc => {
      const forecast = new messages.Forecast();
      forecast.setUnixstart(doc.timeframe.start);
      forecast.setUnixend(doc.timeframe.end);
      forecast.setValue(doc.value);
      forecast.setCommunity(doc.community);

      return forecast;
    });

    const reply = new messages.ForecasterFetchDataReply();
    reply.setSuccess(true);
    reply.setForecastList(forecasts);

    callback(null, reply)
  })

}


module.exports = {
  forecasterFetchData,
  forecasterPushData
}

