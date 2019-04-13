'use strict'

const Datastore = require('nedb');

let db = {}

db.meter    = new Datastore({ filename: 'meter.db', autoload: true });
db.carbon   = new Datastore({ filename: 'carbon.db', autoload: true });
db.forecast = new Datastore({ filename: 'forecast.db', autoload: true });


module.exports = db;