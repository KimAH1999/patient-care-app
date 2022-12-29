// baseline model, will have Doctor, PA, NP, Nurse sub-groups

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Provider extends Model {
   // checkPassword(loginPw) {
        //return bcrypt.compareSync(loginPw, this.password);
    //}
}

Provider.init(
    {
        Providername: {
            type: DataTypes.STRING,
            allowNull: false,
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
            beforeCreate: async(newProviderData) => {
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

model.exports = Provider;