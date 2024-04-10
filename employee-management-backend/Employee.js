// Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: String,
    salary: Number,
    hireDate: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
