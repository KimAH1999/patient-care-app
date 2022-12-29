const sequelize = require('../config/connection');
const seedPatient = require('./PatientData');
const seedProvider = require('./providerData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedPatient();
    await seedProvider();

    process.exit(0);
};

seedAll();