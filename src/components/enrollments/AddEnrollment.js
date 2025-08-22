import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

function AddEnrollment({ onEnrollmentAdded }) {
  const [formData, setFormData] = useState({
    classId: '', studentId: '', enrollmentDate: ''
  });
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes').then(res => setClasses(res.data));
    axios.get('http://localhost:8080/api/students').then(res => setStudents(res.data));
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/enrollments', formData)
      .then(() => {
        setFormData({ classId: '', studentId: '', enrollmentDate: '' });
        setError('');
        onEnrollmentAdded();
      })
      .catch(() => setError('Failed to add enrollment. Please check the entered data.'));
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h5" gutterBottom>Add New Enrollment</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Class</InputLabel>
          <Select value={formData.classId} onChange={handleChange('classId')} label="Class">
            <MenuItem value=""><em>Select</em></MenuItem>
            {classes.map(c => (<MenuItem key={c.classId} value={c.classId}>{c.className}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Student</InputLabel>
          <Select value={formData.studentId} onChange={handleChange('studentId')} label="Student">
            <MenuItem value=""><em>Select</em></MenuItem>
            {students.map(s => (<MenuItem key={s.studentId} value={s.studentId}>{s.firstName}</MenuItem>))}
          </Select>
        </FormControl>
        <TextField label="Enrollment Date" type="date" value={formData.enrollmentDate} onChange={handleChange('enrollmentDate')} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Enrollment</Button>
      </form>
    </Box>
  );
}

export default AddEnrollment;
