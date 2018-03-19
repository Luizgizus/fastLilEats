const HttpStatus = require('http-status')
const Queries = require("./queries")

class TablesController extends Queries {
  constructor() {
    super("mesa", ['nome'])
  }
}

module.exports = TablesController;