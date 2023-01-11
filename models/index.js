const Doctor = require('./Doctor');
const Patient = require('./Patient');

Patient.belongsTo(Doctor, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  Doctor,
  Patient
};