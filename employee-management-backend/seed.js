// seed.js
require('dotenv').config(); // For loading environment variables
const db = require('./config/database'); // Import your Sequelize database instance
const Employee = require('./models/employee'); // Import your Employee model

// Sync database and seed dummy data
const seedDatabase = async () => {
    try {
        await db.sync({ force: true }); // Drop existing tables and re-create them

        await Employee.bulkCreate([
            { name: 'John Doe', position: 'Manager', department: 'IT', salary: 60000 },
            { name: 'Jane Smith', position: 'Developer', department: 'Engineering', salary: 55000 },
            { name: 'Alice Johnson', position: 'HR Manager', department: 'HR', salary: 65000 }
        ]);

        console.log('Dummy data seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.close(); // Close database connection
    }
};

seedDatabase();
