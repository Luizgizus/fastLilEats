const ProductController = require('../controllers/product')

class RouteProduct{
  constructor(app){
    this.productController = new ProductController()
    this.app = app
    
    this.app.route('/product')
    .get((req, res) => {
      this.productController.getAll()
      .then(response => {
          res.status(200)
          res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })

    this.app.route('/product/:id')
    .get((req, res) => {
      this.productController.getById(req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .put((req, res) => {
      this.productController.update(req.body, req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .delete((req, res) => {
      this.productController.delete(req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
  }
}

module.exports = RouteProduct