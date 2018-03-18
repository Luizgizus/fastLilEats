const TablesController = require('../controllers/tables')

class RouteTable{
  constructor(app){
    this.tablesController = new TablesController()
    this.app = app
    
    this.app.route('/tables')
    .get((req, res) => {
      this.tablesController.getAll()
      .then(response => {
          res.status(200)
          res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .post((req, res) => {
      this.tablesController.create(req.body)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })

    this.app.route('/tables/:id')
    .get((req, res) => {
      this.tablesController.getById(req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .put((req, res) => {
      this.tablesController.update(req.body, req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .delete((req, res) => {
      this.tablesController.delete(req.params.id)
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

module.exports = RouteTable