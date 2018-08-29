'use strict';
const mongoose = require('./conection'),
      schemas = require('./schemes');

const models = {
  Categories: mongoose.model('Category', schemas.CategorySchema),
  Products: mongoose.model('Product', schemas.ProductSchema),
  brands : mongoose.model('brand', schemas.BrandSchema)
};

module.exports = models;
