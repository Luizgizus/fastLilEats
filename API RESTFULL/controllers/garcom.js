const Queries = require("./queries")

class GarcomController extends Queries {
    constructor() {
        super("garcon", ['nome', 'gorjeta', 'status'])
    }

    updateGorjeta(idGarçon, gorjeta) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `UPDATE garcon SET gorjeta = ${gorjeta} WHERE id_garcon = ${idGarçon}`

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

module.exports = GarcomController;