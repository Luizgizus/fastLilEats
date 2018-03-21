const GarcomController = require('../controllers/garcom')

class RouteGarcom{
  constructor(app){
    this.garcomController = new GarcomController()
    this.app = app
    
    this.app.route('/garcom')
    .get((req, res) => {
      this.garcomController.getAll()
      .then(response => {
          res.status(200)
          res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })

    this.app.route('/garcom/:id')
    .get((req, res) => {
      this.garcomController.getById(req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .put((req, res) => {
      this.garcomController.update(req.body, req.params.id)
      .then(response => {
        res.status(200)
        res.json(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .delete((req, res) => {
      this.garcomController.delete(req.params.id)
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

module.exports = RouteGarcom