import React from 'react';
import {Button} from "@mui/material";

const EmployeeList = ({ employees }) => {
  return (

      <div>
        <h2>Employee List</h2>
        <ul>
          {employees.map(employee => (
              <li key={employee.id}>{employee.name}</li>
          ))}
        </ul>
      </div>
  );
};

export default EmployeeList;
