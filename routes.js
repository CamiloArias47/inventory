'use strict'

var ApiController  = require('./controllers/api-controller'),
    categoryController = require('./controllers/categoryController'),
    brandController = require('./controllers/brandController'),
    productController = require('./controllers/productController'),
    express = require('express'),
    router  = express.Router()

router.get('/all', ApiController.getAll)
      .get('/agregar', ApiController.addForm)
      .post('/',  ApiController.save)
      .get('/editar/:movie_id', ApiController.getOne)
      .put('/actualizar/:movie_id', ApiController.save)
      .delete('/eliminar/:movie_id', ApiController.delete)
      //::::::::::::Categorias:::::::::::::::::::::::::::::::::::::::::::::::::
      .get('/getAllCategories',categoryController.getAllCategories)
      .post('/saveCategory',categoryController.saveCategory)

      //:::::::::::Marcas:::::::::::::::::::::::::::::::::::::::::::::::::::::::
      .get('/getAllBrands', brandController.getAll)
      .post('/saveBrand', brandController.saveBrand)

      //::::::::::Productos:::::::::::::::::::::::::::::::::::::::::::::::::::::
      .post('/productos/save',productController.saveProduct)

      .get("*", (req, res, next) => {
        console.log(`[debug] url :${req.url}`)
        res.sendFile(`${__dirname}/public/dashboard.html`);
      })
      .use(ApiController.error404) //no se usa get por que get()||post() ejecuta una ruta, pero aca es cuando no existe ninguna ruta que es usuario puso en la url

module.exports = router
