module.exports = {
  checkNotEmpty (req, res, keyDescArr = []) {
    for (let item in keyDescArr) {
      if (!req.fields[item.key]) {
        return res.status(400).json({
          message: item.desc
        })
      }
    }
  }
}