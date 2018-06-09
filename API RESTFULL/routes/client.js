const ClientController = require('../controllers/client')

class RouteClient {
  constructor(app) {
    this.clientsController = new ClientController()
    this.app = app

    this.app.route('/client')
      .get((req, res) => {
        this.clientsController.getAll()
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .post((req, res) => {
        this.clientsController.create(req.body)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })

    this.app.route('/client/:id')
      .get((req, res) => {
        this.clientsController.getById(req.params.id)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .put((req, res) => {
        this.clientsController.update(req.body, req.params.id)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .delete((req, res) => {
        this.clientsController.delete(req.params.id)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }
}

module.exports = RouteClient