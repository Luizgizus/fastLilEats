const OrderController = require('../controllers/order')

class RouteTable {
  constructor(app) {
    this.orderController = new OrderController()
    this.app = app
    this.app.route('/order/byName')
      .post((req, res) => {
        this.orderController.getOrderBbyName(req.body.clientName)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })

    this.app.route('/order/pending')
      .get((req, res) => {
        this.orderController.getAllPending()
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })

    this.app.route('/order')
      .post((req, res) => {
        this.orderController.createOrder(req.body)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })

    this.app.route('/order/:id')
      .get((req, res) => {
        this.orderController.getById(req.params.id)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .put((req, res) => {
        this.orderController.update(req.body, req.params.id)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .delete((req, res) => {
        this.orderController.delete(req.params.id)
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

module.exports = RouteTable