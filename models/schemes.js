const mongoose = require('./conection'),
      Schema = mongoose.Schema;

const schemas = {

    ProductSchema : new Schema({
      product_id : "string",
      name    : "string",
      category_id: "string",
      brand_id:"string",
      inDate:"date",
      minStock:"Number",
      total:"Number",
      cost : "string",
      image    : "string",
      description:"string"
    }),

    CategorySchema : new Schema({
      category_id : "string",
      name    : "string"
    },
    {
      collection : "category"
    }),

    BrandSchema : new Schema({
      brand_id : "string",
      name: "string"
    },
    {
      collection: "brands"
    }),


};

module.exports = schemas;
