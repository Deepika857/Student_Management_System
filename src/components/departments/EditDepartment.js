import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';

function EditDepartment({ department, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    departmentName: '', departmentCode: '', description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (department) {
      setFormData({
        departmentName: department.departmentName,
        departmentCode: department.departmentCode,
        description: department.description || '',
      });
    }
  }, [department]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/departments/${department.id}`, formData)
      .then(() => {
        setError('');
        onSave();
      })
      .catch(() => setError('Failed to update department. Please check the entered data.'));
  };

  if (!department) return null;

  return (
    <Box p={2} minWidth={400}>
      <Typography variant="h5" gutterBottom>Edit Department</Typography>
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
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditDepartment;
