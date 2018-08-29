'use strict'

const mongoose     = require('mongoose'),
      conf         = require('./config-db');
      
mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

module.exports = mongoose
