import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';

function AddDepartment({ onDepartmentAdded }) {
  const [formData, setFormData] = useState({
    departmentName: '', departmentCode: '', description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/departments', formData)
      .then(() => {
        setFormData({ departmentName: '', departmentCode: '', description: '' });
        setError('');
        onDepartmentAdded();
      })
      .catch(() => setError('Failed to add department. Please check the entered data.'));
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h5" gutterBottom>Add New Department</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Department Name"
          value={formData.departmentName}
          onChange={handleChange('departmentName')}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department Code"
          value={formData.departmentCode}
          onChange={handleChange('departmentCode')}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={handleChange('description')}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Department
        </Button>
      </form>
    </Box>
  );
}

export default AddDepartment;
