const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Patient extends Model {}

Patient.init(
  {
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    sex: DataTypes.STRING,
    gender: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    treatment_plan: DataTypes.STRING,
  },
  {
    sequelize
  }
);

module.exports = Patient;
