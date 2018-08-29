'use strict'

var connection = require('./conection'),
    ProductModel = () =>{}

ProductModel.getAll = (callBack) => {
  connection.find().exec( (err, docs) => {
    if(err) throw err
      callBack(docs)
  })
}

ProductModel.getOne = (id, callBack) => {
                     //where
  connection.findOne({product_id:id}).exec( (err, docs)=>{
    if(err) throw err
    console.log(`[debug]documentos: ${docs}`);
    callBack(docs)
  })
}
// Ya no se usan estos metodos, se usa save
ProductModel.insert = (data, callBack) => {}
// Ya no se usan estos metodos, se usa save
ProductModel.update = (data, callBack) => {}

ProductModel.save = (data, callBack) => {
  connection.count({product_id : data.product_id}).exec( (err, count)=>{
    if(err) throw err
    console.log(`[mongo] Numero de docs: ${count}`);

    if(count == 0){
      connection.create(data, (err)=>{
        if(err) throw err
        callBack()
      })
    }
    else if(count == 1){ //el documento existe, actulizalo
      connection.findOneAndUpdate({product_id:data.product_id}, //where
                                  {name:data.name,
                                   cost:data.cost,
                                   rating:data.rating,
                                   image:data.image
                                  },
                                  (err)=>{
                                    if(err) throw err
                                    callBack()
                                  })

    }
  })
}

ProductModel.delete = (id, callBack) => {
  connection.remove({product_id:id}, (err, docs) => {
    if(err) throw err
    callBack()
  })
}

module.exports = ProductModel
