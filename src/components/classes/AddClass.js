import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';

function AddClass({ onClassAdded }) {
  const [formData, setFormData] = useState({
    className: '', startTime: '', endTime: '', grade: '', enrollmentDate: '', roomNumber: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/classes', formData)
      .then(() => {
        setFormData({ className: '', startTime: '', endTime: '', grade: '', enrollmentDate: '', roomNumber: '' });
        setError('');
        onClassAdded();
      })
      .catch(() => setError('Failed to add class. Please check the entered data.'));
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h5" gutterBottom>Add New Class</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField label="Class Name" value={formData.className} onChange={handleChange('className')} required fullWidth margin="normal" />
        <TextField label="Start Time" type="time" value={formData.startTime} onChange={handleChange('startTime')} required fullWidth margin="normal" />
        <TextField label="End Time" type="time" value={formData.endTime} onChange={handleChange('endTime')} required fullWidth margin="normal" />
        <TextField label="Grade" value={formData.grade} onChange={handleChange('grade')} required fullWidth margin="normal" />
        <TextField label="Enrollment Date" type="date" value={formData.enrollmentDate} onChange={handleChange('enrollmentDate')} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Room Number" value={formData.roomNumber} onChange={handleChange('roomNumber')} required fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Class</Button>
      </form>
    </Box>
  );
}

export default AddClass;
