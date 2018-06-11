const Queries = require("./queries")
const PedidoProduto = require("./pedido_produto")
const Garcom = require("./garcom")
const ClientController = require('../controllers/client')

class OrderController extends Queries {
    constructor() {
        super("pedido", ["garcon_id_garcon", "mesa_id_mesa", "status", "tempoEsperaTotal", "nomeCliente", 'cpfCliente'])
    }

    createOrder(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.id_garcon}", "${params.id_mesa}", "Em Andamento", "${params.tempoEstimadoTotal}", "${params.nomeCliente}", "${params.cpfCliente}")`

                            this.conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    console.log(sql)
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                const productStack = params.products
                let pedidoProduto = null
                let responses = []
                for (let i = 0; i < productStack.length; i++) {
                    console.log("entrei")
                    pedidoProduto = new PedidoProduto()
                    responses.push(pedidoProduto.create(productStack[i], res.insertId))
                }

                return res
            })
            .then(() => {
                const clientController = new ClientController()
                return clientController.create(params)
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

    getOrderBbyName(name) {
        let resp = null
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT * FROM ${this.table} WHERE nomeCliente = "${name}" and status != 'encerrado'`

                            this.conn.query(sql, (err, result, fields) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((response) => {
                resp = response
                const garcom = new Garcom()
                console.log(response)
                return garcom.getById(response[0].garcon_id_garcon)
            })
            .then((res) => {
                resp[0].nomeGarcon = res[0].nome
                return resp
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

    getAllPending(columns = "*") {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT 
                                         p.id_pedido,
                                         p.status 'statusPedido',
                                         p.tempoEsperaTotal,
                                         p.nomeCliente,
                                         m.nome 'nomeMesa',
                                         g.nome 'nomeGarcon'
                                         FROM ${this.table} as p
                                         JOIN mesa as m ON mesa_id_mesa = m.id_mesa
                                         JOIN garcon as g ON garcon_id_garcon = g.id_garcon
                                         WHERE p.status != 'encerrado'
                                         ORDER BY id_${this.table}`

                            this.conn.query(sql, (err, result, fields) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

    finalizeOreder(idPedido) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `UPDATE pedido SET status = 'encerrado' WHERE id_pedido = ${idPedido}`

                            this.conn.query(sql, (err, result, fields) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }
}


module.exports = OrderController