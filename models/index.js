const Patient = require('./Patient');
const Provider = require('./Provider');

Provider.hasMany(Patient, {
    foreignKey: 'provider_id',
});

Patient.belongsTo(Provider, {
    foreignKey: 'provider_id',
});

module.exports = { Provider, Patient };
