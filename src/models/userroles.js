'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRoles.belongsTo(models.Users, {
        through: "Users",
        foreignKey: "id"
      });
      UserRoles.belongsTo(models.Roles, {
        through: "Roles",
        foreignKey: "id"
      });
    }
  };
  UserRoles.init({
    userId: DataTypes.INTEGER,
    rolesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoles',
  });
  return UserRoles;
};