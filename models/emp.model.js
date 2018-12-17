
const sequelize = require('sequelize');
var mariaConnection = require('../database/connection');

//Model Schemaa for Employee Table
var Employee = mariaConnection.define('employee', {
    Id: { type: sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    FirstName: sequelize.STRING,
    MiddleName: sequelize.STRING,
    LastName: sequelize.STRING,
    Gender: sequelize.STRING,
    DateOfBirth: sequelize.DATE,
    Email: sequelize.STRING,
    Phone: sequelize.STRING,
    Designation: sequelize.STRING,
    Project: sequelize.STRING,
    Module: sequelize.STRING,
    City: sequelize.STRING,
    State: sequelize.STRING,
    Country: sequelize.STRING,
    PostalCode: sequelize.BIGINT,
    isDeleted:sequelize.BIGINT
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'employee'
    });



module.exports = {

    Employee: Employee

};