const Queries = require("./queries")
const PedidoProduto = require("./pedido_produto")

class OrderController extends Queries {
    constructor(){
        super("pedido", ["garcon_id_garcon", "mesa_id_mesa"])
    }

    createOrder(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.id_garcon}", "${params.id_mesa}")`

                        this.conn.query(sql,(err, result)=>{
                            if(err){
                                reject(err)
                            }else{
                                console.log(sql)
                                resolve(result)
                            }
                        })
                    }
                })
            })
        })
        .then((res)=>{
            const productStack = params.products
            let pedidoProduto = null
            let responses = []
            for(let i = 0; i < productStack.length; i++){
                console.log("entrei")
                pedidoProduto = new PedidoProduto()
                responses.push(pedidoProduto.create(productStack[i], res.insertId))
            }

            return res
        })
        .then((res)=>{
            this.conn.end()
            return Promise.resolve(res)
        })
        .catch((err)=>{
            this.conn.end()
            return Promise.reject(err)
        })
    }
}


module.exports = OrderController