var products = require('../models/models').Products,
    productController = () =>{}

/**
* productController.getAll
* obtine todos los productos, los oredena de forma ascendente
* @param {function} callBack callback que se ejecuta al final del metodo se le pasa el objeto con los Productos
* @return {void} ejecuta un callback
*/
productController.getAll = (callBack)=>{
  products.find().sort({name:1}).exec( (err, docs) => {
    if(err) throw err
      callBack(docs)
  })
}

/**
* productController.save
* guarda un producto nuevo
* @param {object} data objeto con la informacion del producto a Guardar
* @param {function} callBack callback que se ejecuta al final o en caso de error, en caso de error se pasa (err,null)
*                            si se guarda en la base de datos se pasa (true, object => datos guardados en la base de datos)
* @return {void} ejecuta un callBack
*/
productController.save = (data, callBack) => {

    products.create(newProduct, (err)=>{
      if(err) callBack(err,null)
      callBack(true,newProduct)
    })
}

/**
* productController.formatCode
* devuelve un string de longitud 4, para formar el codigo de el producto
* @param {int} length total de documentos
* @return {string}
*/
productController.formatCode = (length)=>{
  var code;
  if(length < 10){
    code = length+""+"000";
  }
  else if(length >= 10 && length < 100 ){
    code = length+""+"00"
  }
  else if(length >= 100 && length < 1000){
    code = length+""+"0";
  }
  else{
    code = length;
  }
  return code;
}

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ╔═╗┌─┐┌┬┐┬┌─┐┬┌─┐┌┐┌┌─┐┌─┐  ┌─┐┌─┐┌┬┐  ┬ ┬  ┌─┐┌─┐┌─┐┌┬┐
    ╠═╝├┤  │ ││  ││ ││││├┤ └─┐  │ ┬├┤  │   └┬┘  ├─┘│ │└─┐ │
    ╩  └─┘ ┴ ┴└─┘┴└─┘┘└┘└─┘└─┘  └─┘└─┘ ┴    ┴   ┴  └─┘└─┘ ┴
    peticiones get y post
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/

/**
* productController.saveProduct
* responde a peticiones post, guarda un producto en la base de datos
*/
productController.saveProduct = (req,res,next) => {

  products.find({category_id:req.body.category_id, brand_id:req.body.brand_id}, (err,docs)=>{
    var product_id = req.body.category_id+""+req.body.brand_id+""+productController.formatCode(docs.length);
    let newProduct = {product_id : product_id,
                      name    : req.body.name,
                      category_id: req.body.category_id,
                      brand_id:req.body.brand_id,
                      inDate:req.body.inDate,
                      minStock:req.body.minStock,
                      total:req.body.total,
                      cost : req.body.cost,
                      image    : req.body.image,
                      description:req.body.description}
  })

  productController.save(newProduct, (err,newProduct) =>{ res.json({save:err,product:newProduct})});
}

module.exports = productController
