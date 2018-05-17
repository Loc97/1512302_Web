'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {});
  Article.associate = function(models) {
    Article.hasMany(models.Comment)
  };
  return Article;
};