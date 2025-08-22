import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';

function EditClass({ classData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    className: '', startTime: '', endTime: '', grade: '', enrollmentDate: '', roomNumber: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (classData) {
      setFormData({
        className: classData.className,
        startTime: classData.startTime,
        endTime: classData.endTime,
        grade: classData.grade,
        enrollmentDate: classData.enrollmentDate,
        roomNumber: classData.roomNumber,
      });
    }
  }, [classData]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/classes/${classData.enrollmentId}`, formData)
      .then(() => {
        setError('');
        onSave();
      })
      .catch(() => setError('Failed to update class. Please check the entered data.'));
  };

  if (!classData) return null;

  return (
    <Box p={2} minWidth={400}>
      <Typography variant="h5" gutterBottom>Edit Class</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField label="Class Name" value={formData.className} onChange={handleChange('className')} required fullWidth margin="normal" />
        <TextField label="Start Time" type="time" value={formData.startTime} onChange={handleChange('startTime')} required fullWidth margin="normal" />
        <TextField label="End Time" type="time" value={formData.endTime} onChange={handleChange('endTime')} required fullWidth margin="normal" />
        <TextField label="Grade" value={formData.grade} onChange={handleChange('grade')} required fullWidth margin="normal" />
        <TextField label="Enrollment Date" type="date" value={formData.enrollmentDate} onChange={handleChange('enrollmentDate')} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Room Number" value={formData.roomNumber} onChange={handleChange('roomNumber')} required fullWidth margin="normal" />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditClass;
