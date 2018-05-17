var controller = {};

var models = require('../models');

controller.add = function(aid, mess){
    models.Comment
    .create({
        comment: mess,
        ArticleId: aid,
        createAt: Date(),
        updateAt: Date()
    })
};

controller.delete = function(id, callback){
    models.Comment
    .destroy({ 
        where: {id: id}
    })
    .then(function(comment){
        callback(comment);
    });
};

controller.update = function(id, mess, callback){
    models.Comment
    .find({ 
        where: {id: id}
    })
    .then(function(comment){
        if(comment){
            comment.updateAttributes({
                comment: mess,
                updateAt: Date()
            }) 
        }
    })
    .then(function(comment){
        callback(comment);
    })
}

module.exports = controller;