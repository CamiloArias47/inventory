
/**
* @fileoverview Libreria con funciones de utilidad
*
* @author CamiloArias47
* @version 0.1
*/

const brands = require('../models/models').brands,
      BrandController = () => {}

//retorna las marcas
//calBack = function(docs) docs => json
BrandController.get = ( callBack ) => {
  brands.find().sort({name:1}).exec( (err, docs) => {
    if(err){
       throw err
    }
    else{
      callBack(docs);
    }
  })
}


/**
* BrandController.save
* Guarda una marca en la coleccion brand de la base de datos
* @param {Object} data información a guardar => {name : string}
* @param {Function} callBack callback, se le pasa (bool, object) bool => true si guarda, object => nueva marca guardada
* @returns {void} pasa parametros al callback
*/
BrandController.save = ( data, callBack )=>{
  brands.countDocuments().exec( (err,totalDocs)=>{
    let newBrand = {brand_id:(totalDocs >= 10)?totalDocs+1:"0"+totalDocs,
                    name:data.name}

    brands.create(newBrand, (err)=>{
      if(err) callBack(err,null)
      callBack(true,newBrand)
    })
  })
}

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ╔═╗┌─┐┌┬┐┬┌─┐┬┌─┐┌┐┌┌─┐┌─┐  ┌─┐┌─┐┌┬┐  ┬ ┬  ┌─┐┌─┐┌─┐┌┬┐
    ╠═╝├┤  │ ││  ││ ││││├┤ └─┐  │ ┬├┤  │   └┬┘  ├─┘│ │└─┐ │
    ╩  └─┘ ┴ ┴└─┘┴└─┘┘└┘└─┘└─┘  └─┘└─┘ ┴    ┴   ┴  └─┘└─┘ ┴
    peticiones get y post
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/


BrandController.getAll = (req, res, next) =>{
  BrandController.get( docs => {
    let locals = {
      title : 'Brands',
      data : docs
    }
    res.json(locals);
  })
}

/**BrandController.saveBrand
* maneja peticiones get y retorna un json con las marcas
* @param {object} req peticion
* @param {object} res respuesta
* @param {function} next
* @returns {void} responde con un json {save: [true|object], data: {name:"string"}}
*/
BrandController.saveBrand = (req,res,next) => {
  let brand = {
    name : req.body.name
  }

  BrandController.save(brand, (err, dataSaved)=>res.json({save:err,data:dataSaved}))
}

module.exports = BrandController;
