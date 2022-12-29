const { Provider } = require('../models');

const Providerdata = [
  {
    provider_name: 'Dr. Donald Duck',
    email:'donald@fakeemail.com',
    password: 'realRealPw234',
  },
];

const seedProvider = () => Provider.bulkCreate(Providerdata);

module.exports = seedProvider;
