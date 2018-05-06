const Queries = require("./queries")
const PedidoProduto = require("./pedido_produto")

class PedidoProdutoController extends Queries {
    constructor() {
        console.log("instanciei")
        super("pedido_produto", ["pedido_id_pedido", "produto_id_produto", "quantidade"])
        console.log("instanciei")
    }

    create(params, idPedido) {
        console.log(params)
        console.log(idPedido)
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${idPedido}", "${params.id_produto}", ${params.qunatidade})`

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
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

    getItensByOrder(id) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT 
                                        pp.quantidade 'qtd',
                                        p.nome,
                                        p.tempo_estimado,
                                        p.valor
                                        FROM pedido_produto as pp
                                        join produto as p on p.id_produto = pp.produto_id_produto
                                        where pedido_id_pedido = ${id}
                                        order by p.name`

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


module.exports = PedidoProdutoController