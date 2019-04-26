const marked = require('marked');
const Article = require('../lib/mongo').Article;

// 将 comment 的 content 从 markdown 转换成 html
// Comment.plugin('contentToHtml', {
//   afterFind: function(comments) {}
//   // 
// });

module.exports = {
  list () {
    return Article.find().exec()
  },

  add (article){
    return Article.insertOne(article).exec()
  },

  delete (id) {
    return Article.deleteOne({_id: id})
  },

  update (article) {
    return Article.replaceOne({id: article.id}, article).exec()
  }
}