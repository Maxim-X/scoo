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
    driver_license_number: {type: DataTypes.STRING, allowNull: true},
    passport_number: {type: DataTypes.STRING, allowNull: true},
    birthday: {type: DataTypes.DATEONLY, allowNull: true},
    another_document_name: {type: DataTypes.STRING, allowNull: true},
    another_document_number: {type: DataTypes.STRING, allowNull: true},
    //id_company :{type: DataTypes.INTEGER, allowNull: false},
});

const PhoneNumbers = sequelize.define('phone_numbers',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.STRING, allowNull: false},
});
const ClientsEmail  = sequelize.define('clients_email',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
});

const Images = sequelize.define('images',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    path: {type: DataTypes.STRING, allowNull: false},
});

Company.hasMany(RoleAccess);
RoleAccess.belongsTo(Company);

Company.hasMany(Client);
Client.belongsTo(Company);

RoleAccess.hasOne(User);
User.belongsTo(RoleAccess);

Client.hasMany(PhoneNumbers);
PhoneNumbers.belongsTo(Client);

Client.hasMany(ClientsEmail);
ClientsEmail.belongsTo(Client);

Client.hasMany(Images);
Images.belongsTo(Client);

module.exports = {
    Company,
    User,
    RoleAccess,
    Client,
    PhoneNumbers,
    ClientsEmail,
    Images
};