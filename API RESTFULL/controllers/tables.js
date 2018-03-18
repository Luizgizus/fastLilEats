const HttpStatus = require('http-status')
const Queries = require("./queries")

class TablesController extends Queries {
  constructor() {
    super("Mesa", ['nomeMesa', 'quantidadePessoas', 'status'])
  }
}

module.exports = TablesController;