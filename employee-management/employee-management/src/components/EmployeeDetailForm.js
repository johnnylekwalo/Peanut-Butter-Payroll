// EmployeeDetailForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function EmployeeDetailForm({ employeeId }) {
    const [employee, setEmployee] = useState({
        id: '',
        name: '',
        email: '',
        // Add more fields as needed+
    });

    useEffect(() => {
        // Fetch employee data from your REST API based on employeeId
        fetch(`http://localhost:5000/api/employees/${employeeId}`)
            .then(response => response.json())
            .then(data => setEmployee(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [employeeId]);

    const handleChange = event => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        // Send updated employee data to your REST API for updating
        fetch(`your-api-url/${employee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(response => {
                if (response.ok) {
                    // Handle success
                } else {
                    // Handle error
                }
            })
            .catch(error => console.error('Error updating data:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                name="email"
                label="Email"
                value={employee.email}
                onChange={handleChange}
                fullWidth
                required
            />
            {/* Add more fields as needed */}
            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </form>
    );
}

export default EmployeeDetailForm;
