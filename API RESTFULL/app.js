const bodyParser = require('body-parser')
const express = require('express')
const TablesRouter = require('./routes/tables')
const OrderRouter = require('./routes/order')
const ProducRouter = require('./routes/product')
const OrderProducRouter = require('./routes/pedidoProduto')
const GarcomRouter = require('./routes/garcom')
const ClientRouter = require('./routes/client')
const LoginRouter = require('./routes/login')
const Config = require('./config/config')

class App {
    constructor() {
        this.app = express()
        this.app.all('*', function (req, res, next) {
            var responseSettings = {
                "AccessControlAllowOrigin": req.headers.origin,
                "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
                "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
                "AccessControlAllowCredentials": true
            }
            res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
            res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
            next()
        })

        this.app.use(bodyParser.json())
        this.tablesRouter = new TablesRouter(this.app)
        this.orderRouter = new OrderRouter(this.app)
        this.productRouter = new ProducRouter(this.app)
        this.orderProducRouter = new OrderProducRouter(this.app)
        this.garcomRouter = new GarcomRouter(this.app)
        this.clientRouter = new ClientRouter(this.app)
        this.loginRouter = new LoginRouter(this.app)

    }
}

module.exports = App