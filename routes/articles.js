var express = require('express');
var router = express.Router();

var articlesController = require('../controllers/articlesController');
var commentsController = require('../controllers/commentsController');

router.get('/', function(req, res){
    articlesController.getAll(function(articles){
        res.render('index', {articles: articles});
    });
});

router.get('/:id', function(req, res){
    articlesController.getById(req.params.id, function(article){
        res.render('details', {article: article});
    });
});

router.post('/:id', function(req, res){
    commentsController.add(req.params.id, req.body.comment);
    res.redirect('/articles/'+ req.params.id);
});

router.get('/:aid/:id', function(req, res){
    commentsController.delete(req.params.id);
    res.redirect('/articles/'+ req.params.aid);
});

module.exports = router;