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

controller.search = function(string, callback){
    console.log(string);
    models.Article  
    .findAll({
        where: {
            $or: string
        }
    })
    .then(function(articles){
        callback(articles);
    })
}

module.exports = controller;