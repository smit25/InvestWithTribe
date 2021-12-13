const path = require('path')
var appDir = path.dirname(require.main.filename)

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/signup')
  })
  app.get('/signup', (req, res) => {
    res.render('signup')
  })

  app.get('/home', (req, res) => {
    res.render('home')
  })
}