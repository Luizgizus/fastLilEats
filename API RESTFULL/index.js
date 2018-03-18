const App = require('./app')
const router = new App()

router.app.listen('8000', () => {
  console.log(`app running on http://localhost:8000`)
})