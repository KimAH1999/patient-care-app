const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Patient extends Model { }

Patient.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
        beforeCreate: async (newPatientData) => {
            newPatientData.password = await bcrypt.hash(newPatientData.password, 10);
            return newPatientData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTablename: true,
    underscored: true,
    modelName: 'Patient',
  }
);

module.exports = Patient;
