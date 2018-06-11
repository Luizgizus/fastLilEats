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
  }
}

module.exports = RouteClient