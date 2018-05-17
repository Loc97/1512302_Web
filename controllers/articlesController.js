var controller = {};

var models = require('../models');

controller.getAll = function(callback){
    models.Article
    .findAll()
    .then(function(articles){
        callback(articles);
    })
};

controller.getById = function(id, callback){
    models.Article
    .findOne({
        where: {id: id},
        include: [models.Comment]
    })
    .then(function(article){
        callback(article);
    })
};

module.exports = controller;