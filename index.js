'use strict'
require('babel-register')
import express from "express";

const app = express(),
      bodyParser = require('body-parser'),
      routes = require('./routes');
      
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:false}) )
app.use(express.static("public"));
app.use(routes);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening in http://localhost:3000`);
});
