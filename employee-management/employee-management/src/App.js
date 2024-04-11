import React, { useState, useEffect } from 'react';

import axios from 'axios';
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import DeleteEmployee from "./components/DeleteEmployee";
import {Button} from "@mui/material";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetailForm from "./components/EmployeeDetailForm";

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from API
    axios.get('http://localhost:5000/api/employees')

        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleAddEmployee = (employeeData) => {
    // Add new employee to the list
    setEmployees([...employees, employeeData]);
  };

  const handleDeleteEmployee = (employeeId) => {
    // Delete employee from the list
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  return (

      <div>
          <EmployeeForm onSubmit={handleAddEmployee} />
          <h1>Current Employees</h1>
          <EmployeeTable />
          <EmployeeList employees={employees} />
        {employees.map(employee => (
            <div key={employee.id}>
              {employee.name}
              <DeleteEmployee employeeId={employee.id} onDelete={handleDeleteEmployee} />
            </div>
        ))}
          <h1>Employee Information</h1>
          <EmployeeDetailForm/>
      </div>

  );
};

export default App;
