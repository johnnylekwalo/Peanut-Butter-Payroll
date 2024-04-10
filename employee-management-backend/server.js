// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const Employee = require('./models/employee');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// ## CORS middleware
//
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);
// app.use(bodyParser.json(allowCrossDomain));

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a single employee by ID
app.get('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new employee
app.post('/api/employees', async (req, res) => {
    const { name, position, department, salary } = req.body;
    try {
        const newEmployee = await Employee.create({ name, position, department, salary });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an existing employee
app.put('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position, department, salary } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.update({ name, position, department, salary });
        res.json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await db.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
});
