module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/article')
  })
  app.use('/article', require('./article'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).json()
    }
  })
}
