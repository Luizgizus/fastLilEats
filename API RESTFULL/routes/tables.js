const TablesController = require('../controllers/tables')

module.exports = (app) => {
  const tablesController = new TablesController(app.datasource.models.Table);
  app.route('/tables')
  .get((req, res) => {
    tablesController.getAll()
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .post((req, res) => {
    tablesController.create(req.body)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  });

  app.route('/tables/:id')
  .get((req, res) => {
    tablesController.getById(req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .put((req, res) => {
    tablesController.update(req.body, req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  })
  .delete((req, res) => {
    tablesController.delete(req.params)
    .then(response => {
      res.status(response.statusCode);
      res.json(response.data);
    });
  });
};
