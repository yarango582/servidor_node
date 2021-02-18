'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResetTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResetTokens.belongsTo(models.Users, {
        through: "Users",
        foreignKey: "id"
      })
    }
  };
  ResetTokens.init({
    token: DataTypes.UUID,
    expirationDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ResetTokens',
  });
  return ResetTokens;
};