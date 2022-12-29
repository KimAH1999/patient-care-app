const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Patient extends Model {}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkin_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Patient',
  }
);

module.exports = Patient;
