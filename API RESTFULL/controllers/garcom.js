const Queries = require("./queries")

class GarcomController extends Queries {
    constructor() {
        super("garcon", ['nome','gorjeta','status'])
    }
}

module.exports = GarcomController;