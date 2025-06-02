const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hideBirthYear: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    workPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    position: DataTypes.STRING,
    department: DataTypes.STRING,
    workAddress: DataTypes.STRING,
    about: DataTypes.TEXT,
    photo: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    indexes: [{ fields: ['fullName'] }]
  });
  return User;
};