var express = require('express');
var router = express.Router();

var commentsController = require('../controllers/commentsController');
var articlesController = require('../controllers/articlesController');

router.post('/:id', function(req, res){
    commentsController.add(req.params.id, req.body.comment);
    articlesController.getById(req.params.id, function(article){
        res.render('details', {article: article});
    });
});

router.get('/:id', function(req, res){
    commentsController.delete(req.params.id);
	articlesController.getById(req.params.id, function(article){
        res.render('details', {article: article});
    });
})
module.exports = router;