'use strict';
const {
  Model
} = require('sequelize');
const { User } = require('../models') 
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Folder.belongsTo(models.User, {
        as: 'folders', foreignKey: 'userId'
      })
      Folder.hasMany(models.Task, {
        as: 'tasks', foreignKey: 'folderId'
      })
    }
  };
  Folder.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};