const LoginController = require('../controllers/login')

class RouteLogin {
  constructor(app) {
    this.loginController = new LoginController()
    this.app = app

    this.app.route('/signIn')
      .post((req, res) => {
        this.loginController.getByLogin(req.body)
          .then(response => {
            res.status(200)
            res.json(response)
          })
          .catch((err) => {
            let error = {
              message: err,
              res: false
            }

            res.status(403)
            res.json(error)
          })
      })
  }
}

module.exports = RouteLogin