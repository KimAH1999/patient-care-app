// baseline model, will have Doctor, PA, NP, Nurse sub-groups

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Provider extends Model {
    // checkPassword(loginPw) {
    //return bcrypt.compareSync(loginPw, this.password);
    //}
}

Provider.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        provider_name: {
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
            beforeCreate: async (newProviderData) => {
                newProviderData.password = await bcrypt.hash(newProviderData.password, 10);
                return newProviderData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTablename: true,
        underscored: true,
        modelName: 'Provider',
    }
);

module.exports = Provider;