import React, { useState } from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box
} from '@mui/material';
import axios from 'axios';

function AddStudent({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    firstName: '', dateOfBirth: '', gender: '', email: '', phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/students', formData)
      .then(() => {
        setFormData({ firstName: '', dateOfBirth: '', gender: '', email: '', phoneNumber: '' });
        setError('');
        onStudentAdded();
      })
      .catch(() => setError('Failed to add student. Please check the entered data.'));
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h5" gutterBottom>Add New Student</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField label="First Name" value={formData.firstName} onChange={handleChange('firstName')} required fullWidth margin="normal" />
        <TextField label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={handleChange('dateOfBirth')} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Gender</InputLabel>
          <Select value={formData.gender} onChange={handleChange('gender')} label="Gender">
            <MenuItem value=""><em>Select</em></MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Email" value={formData.email} onChange={handleChange('email')} type="email" fullWidth margin="normal" />
        <TextField label="Phone Number" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} required fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Student</Button>
      </form>
    </Box>
  );
}

export default AddStudent;