var connection = require('../models/models').Categories,
    categoryController = () =>{}

categoryController.getAll = (callBack) => {
  connection.find().sort({name:1}).exec( (err, docs) => {
    if(err) throw err
      callBack(docs)
  })
}

categoryController.getOne = (id, callBack) => {
                 //where
connection.findOne({product_id:id}).exec( (err, docs)=>{
if(err) throw err
console.log(`[debug]documentos: ${docs}`);
callBack(docs)
})
}
// Ya no se usan estos metodos, se usa save
categoryController.insert = (data, callBack) => {}
// Ya no se usan estos metodos, se usa save
categoryController.update = (data, callBack) => {}

//guarda o actualiza una categoria
//data = object
//callBack = function
categoryController.save = (data, callBack) => {
  connection.countDocuments({name : data.name}).exec( (err, count)=>{
    if(err) throw err
    console.log(`[mongo] Numero de docs: ${count}`);

    if(count == 0){
      connection.countDocuments().exec( (err,totalDocs)=>{
        let newCategory = {category_id:(totalDocs >= 10)?totalDocs+1:"0"+totalDocs,
                           name:data.name}
        connection.create(newCategory, (err)=>{
          if(err) callBack(err,null)
          callBack(true,newCategory)
        })
      })
    }
    else if(count == 1){ //el documento existe, actulizalo
      connection.findOneAndUpdate({category_id:data.category_id}, //where
                                  {name:data.name,
                                  },
                                  (err)=>{
                                    if(err) callBack(err,null)
                                    callBack(true,{category_id:data.category_id,name:data.name})
                                  })

    }
  })
}

categoryController.delete = (id, callBack) => {
  connection.remove({product_id:id}, (err, docs) => {
    if(err) throw err
    callBack()
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

//Retorna todas las categorias
categoryController.getAllCategories = (req, res, next) =>{
  categoryController.getAll( docs =>{
    let locals = {
      title : 'Categorias',
      data : docs
    }
    res.json(locals);
  })
}

//maneja peticiones post para guarda o actualiza categorias
categoryController.saveCategory = (req, res, next) =>{
  console.log(`[debug] req:${req}`,req);
  let category = {
    product_id : req.body.product_id,
    name : req.body.name
  }

  categoryController.save( category, (err,newCategory)=>res.json({save:err,data:newCategory}) )
}

module.exports = categoryController
