// models/employee.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Employee = db.define('employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.FLOAT
    },
    hireDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});



module.exports = Employee;
