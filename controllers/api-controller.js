'use strict'

var ProductModel = require('../models/product-model'),
    ApiController = () =>{}

ApiController.getAll = (req, res, next) =>{
  console.log(`[debug] getAll inicio funcion`);
  ProductModel.getAll( (docs) =>{
    let locals = {
      title : 'todos los Productos',
      data : docs
    }
    console.log(`[debug] getAll ${locals}`);
    res.json(locals);
  })
}

ApiController.getOne = (req, res, next) =>{
  let movie_id = req.params.movie_id
  console.log(movie_id);
  ProductModel.getOne(movie_id, (docs)=>{

      let locals ={
        title : 'Editar Pelicula',
        data : docs
      }

      res.json(locals)

  })
}

/*Estos ya no se usan por que se va a usar el metodo save*/
ApiController.insert = (req, res, next) =>{
  let movie = {
    movie_id : req.body.movie_id,
    title : req.body.title,
    realease_year : req.body.realease_year,
    rating : req.body.rating,
    image : req.body.image
  }
  console.log(movie);

  ProductModel.insert(movie, (err)=>{
    if(err){
      let locals = {
        title : `Error al agregar el registro con id: ${movie.movie_id}`,
        description: 'Error de Sintaxis SQL',
        error:err
      }
      res.json(locals)
    }
    else{
      res.redirect('/')
    }
  })
}
/*Estos ya no se usan por que se va a usar el metodo save*/
ApiController.update = (req, res, next) =>{
  let movie = {
    movie_id : req.body.movie_id,
    title : req.body.title,
    realease_year : req.body.realease_year,
    rating : req.body.rating,
    image : req.body.image
  }
  console.log(movie);

  ProductModel.update(movie, (err)=>{
    if(err){
      let locals = {
        title : `Error al actualizar el registro con id: ${movie.movie_id}`,
        description: 'Error de Sintaxis SQL',
        error:err
      }
      res.json(locals)
    }
    else{
      res.redirect('/')
    }
  })
}

ApiController.save = (req, res, next) =>{
  let movie = {
    movie_id : req.body.movie_id,
    title : req.body.title,
    realease_year : req.body.realease_year,
    rating : req.body.rating,
    image : req.body.image
  }
  console.log(movie);

  ProductModel.save( movie, ()=>res.redirect('/') )
}

ApiController.delete = (req, res, next) =>{
  let movie_id = req.params.movie_id
  console.log(movie_id);

  ProductModel.delete( movie_id, ()=> res.redirect('/') )
}

ApiController.addForm = (req, res, next) => res.render('add-movie', {title:'Agregar Pelicula'})

ApiController.error404 = (req, res, next) =>{
  let error = new Error(),
      locals = {
        title : 'Error 404',
        description : 'Recurso No encontrado',
        error : error
      }

  error.status = 404
  res.json(locals)
  next() //ejecute siguiente middleware
}

module.exports = ApiController
