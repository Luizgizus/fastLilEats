const Queries = require("./queries")

class ProductController extends Queries {
    constructor() {
        super("produto", ['valor', 'nome', 'descricao', 'tipo', 'tempo_estimado'])
    }

    create(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `INSERT INTO produto (${this.strColumns})
                                         VALUES (${params.valor}, "${params.nome}", "${params.descricao}", "${params.tipo}", ${params.tmpEstm})`

                            this.conn.query(sql, (err, result) => {
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

module.exports = ProductController;