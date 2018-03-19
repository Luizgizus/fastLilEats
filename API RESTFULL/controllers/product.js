const Queries = require("./queries")

class ProductController extends Queries {
    constructor() {
        super("produto", ['valor','nome','descricao','tipo','quantidade'])
    }
}

module.exports = ProductController;