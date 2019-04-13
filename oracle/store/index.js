'use strict'

const Datastore = require('nedb');

const db = new Datastore({ filename: 'forecast.db', autoload: true });

module.exports = db;