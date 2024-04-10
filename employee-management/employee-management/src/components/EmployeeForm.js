import React, { useState } from 'react';
import {Button} from "@mui/material";

const EmployeeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>


  );
};

export default EmployeeForm;
