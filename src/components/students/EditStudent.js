import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box
} from '@mui/material';
import axios from 'axios';

function EditStudent({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '', dateOfBirth: '', gender: '', email: '', phoneNumber: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        email: student.email || '',
        phoneNumber: student.phoneNumber,
      });
    }
  }, [student]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/students/${student.studentId}`, formData)
      .then(() => {
        setError('');
        onSave();
      })
      .catch(() => setError('Failed to update student. Please check the entered data.'));
  };

  if (!student) return null;

  return (
    <Box p={2} minWidth={400}>
      <Typography variant="h5" gutterBottom>Edit Student</Typography>
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
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditStudent;