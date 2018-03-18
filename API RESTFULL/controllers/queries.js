const Config = require("../config/config")
const mysql = require("mysql")
const Promise = require("bluebird")

class Query{
    constructor(table, columns){
        this.config = new Config()
        this.table = table
        this.strColumns = columns.join(",")
        this.columns = columns
        this.conn = mysql.createConnection(this.config.getConfig())
    }
    
    createConnectionSQL(){
        return new Promise((resolve, reject)=>{
            this.conn = mysql.createConnection(this.config.getConfig())
            resolve()
        })
    }

    create(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(params)
                        const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ('${params.nomeMesa}', ${params.quantidadePessoas}, '${params.status}')`
    
                        this.conn.query(sql,(err, result)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
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

    update(params, id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(params)
                        const sql = `UPDATE ${this.table} SET ${this.getQueryParams(params)} WHERE id${this.table} = ${id}`
    
                        this.conn.query(sql,(err, result)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
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

    getQueryParams(params){
        const keys = Object.keys(params)
        let strQuery = ""
        for(let i = 0; i < keys.length; i++){
            if(i == keys.length - 1){
                if(isNaN(parseInt(keys[i]))){
                    strQuery += `${keys[i]} = "${params[keys[i]]}"`
                }else{
                    strQuery += `${keys[i]} = ${params[keys[i]]}`
                }
            }else{
                if(isNaN(parseInt(keys[i]))){
                    strQuery += `${keys[i]} = "${params[keys[i]]}", `
                }else{
                    strQuery += `${keys[i]} = ${params[keys[i]]}, `
                }
            }
        }

        return strQuery
    }

    getById(id, columns = "*"){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT * FROM ${this.table} WHERE id${this.table} = ${id}`
    
                        this.conn.query(sql, (err, result, fields)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
        })
        .then((res)=>{
            this.conn.end()
            return Promise.resolve(res)
        })
        .catch((err)=>{
            this.conn.end()
            return Promise.reject(err)
        })






        return this.conn.connect((err)=>{
            return new Promise((reject, resolve)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
        .then(()=>{
            const sql = `SELECT * FROM ${this.table} WHERE id${this.table} = ${id}`

            this.conn.query(sql, (err, result, fields)=>{
                return new Promise((reject, resolve)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    getAll(columns = "*"){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT * FROM ${this.table} ORDER BY id${this.table}`
    
                        this.conn.query(sql, (err, result, fields)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
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

    delete(id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `DELETE FROM ${this.table} WHERE id${this.table} = ${id}`
    
                        this.conn.query(sql,(err, result)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
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

module.exports = Query