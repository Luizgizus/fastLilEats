const HttpStatus = require('http-status')
const Queries = require("./queries")

class LoginController extends Queries {
    constructor() {
        super("usuarios", ['login', 'senha'])
    }

    getByLogin(loginData) {
        console.log(loginData)
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT login, senha
                                        from ${this.table}
                                        WHERE login = '${loginData.login}'`

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
                console.log(res)
                if (res && res.length) {
                    if (loginData.senha === res[0].senha) {
                        delete res[0].senha
                        res[0].message = "logado"
                        res[0].res = true
                    } else {
                        return Promise.reject("Senha incorreta, tente novamente")
                    }
                } else {
                    return Promise.reject("Usuario inexistente")
                }
                this.conn.end()
                return Promise.resolve(res[0])
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }
}

module.exports = LoginController;