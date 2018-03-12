const HttpStatus = require('http-status')

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class TablesController {
  constructor(Tables) {
    this.Tables = Tables;
  }

  getAll() {
    return this.Tables.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Tables.findOne({
      where: params,
    })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Tables.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Tables.update(data, {
      where: params,
    })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Tables.destroy({
      where: params,
    })
    .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

module.exports = TablesController;
