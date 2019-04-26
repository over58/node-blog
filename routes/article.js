const express = require('express')
const router = express.Router()
const ArticleModel = require('../models/article')


router.get('/', function (req, res, next) {
  ArticleModel.list()
    .then(function (artciles) {
      res.status(200).json({
        resutls: artciles
      })
    })
    .catch(next)
})

router.post('/', function (req, res, next) {
   if (!req.fields.title) {
     res.status(400).json({
       message: '文章标题不能为空'
     })
   }
   if (!req.fields.content) {
     res.status(400).json({
       message: '文章内容不能为空'
     })
   }
   if (!req.fields.tag) {
     res.status(400).json({
       message: '文章类型不能为空'
     })
   }

   let article = {
     title: req.fields.title,
     content: req.fields.content,
     tag: req.fields.tag
   }
  ArticleModel.add(article)
    .then(function (artciles) {
      res.status(200).json({
        message: '添加成功'
      })
    })
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  console.log(req.params.id)
  ArticleModel.delete(req.params.id)
    .then(function (artciles) {
      res.status(200).json({
        message: '删除成功'
      })
    })
    .catch(next)
})

module.exports = router