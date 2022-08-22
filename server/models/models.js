const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Company = sequelize.define( 'company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    // id_role: {type: DataTypes.INTEGER},
});

const RoleAccess = sequelize.define( 'role_access', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    is_admin: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    all_access: {type: DataTypes.JSON, allowNull: true},
    //id_company :{type: DataTypes.INTEGER, allowNull: false},
});

const Client = sequelize.define( 'client', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, allowNull: true},
    passport_series: {type: DataTypes.STRING, allowNull: true},
    passport_number: {type: DataTypes.STRING, allowNull: true},
    birthday: {type: DataTypes.DATEONLY, allowNull: true},
    //id_company :{type: DataTypes.INTEGER, allowNull: false},
});

Company.hasMany(RoleAccess);
RoleAccess.belongsTo(Company);

Company.hasMany(Client);
Client.belongsTo(Company);

RoleAccess.hasOne(User)
User.belongsTo(RoleAccess);

module.exports = {
    Company,
    User,
    RoleAccess,
    Client
};