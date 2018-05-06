const PedidoProdutoController = require('../controllers/pedido_produto')

class PedidoProduto {
  constructor(app) {
    this.pedidoProdutoController = new PedidoProdutoController()
    this.app = app

    this.app.route('/pedidoProduto/:id')
      .get((req, res) => {
        this.pedidoProdutoController.getItensByOrder(req.params.id)
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

module.exports = PedidoProduto