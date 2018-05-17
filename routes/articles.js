var express = require('express');
var router = express.Router();

var articlesController = require('../controllers/articlesController');
var commentsController = require('../controllers/commentsController');

router.get('/', function(req, res){
    articlesController.getAll(function(articles){
        res.render('index', {articles: articles});
    });
});

router.post('/', function(req,res){
    var string = req.body.name.split(' ');
    var temp = [];
    for (let i = 0; i < string.length; ++i){
        let a = '%' + string[i] + '%';
        temp.push({title: {$ilike: a}});
        temp.push({summary: {$ilike: a}});
        temp.push({description: {$ilike: a}});
    }
    articlesController.search(temp, function(articles){
        res.render('index', {articles: articles});
    });
});

router.get('/:id', function(req, res){
    articlesController.getById(req.params.id, function(article){
        res.render('details', {article: article});
    });
});

router.post('/:id', function(req, res){
    commentsController.add(req.params.id, req.body.comment, function(comment){
        res.redirect('/articles/'+ req.params.id);
    });
});

router.get('/:aid/:id', function(req, res){
    commentsController.delete(req.params.id, function(comment){
        res.redirect('/articles/'+ req.params.aid);
    });
});

module.exports = router;