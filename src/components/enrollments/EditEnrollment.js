import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

function EditEnrollment({ enrollment, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    classId: '', studentId: '', enrollmentDate: ''
  });
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes').then(res => setClasses(res.data));
    axios.get('http://localhost:8080/api/students').then(res => setStudents(res.data));
    if (enrollment) {
      setFormData({
        classId: enrollment.classId,
        studentId: enrollment.studentId,
        enrollmentDate: enrollment.enrollmentDate,
      });
    }
  }, [enrollment]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/enrollments/${enrollment.enrollmentId}`, formData)
      .then(() => {
        setError('');
        onSave();
      })
      .catch(() => setError('Failed to update enrollment. Please check the entered data.'));
  };

  if (!enrollment) return null;

  return (
    <Box p={2} minWidth={400}>
      <Typography variant="h5" gutterBottom>Edit Enrollment</Typography>
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
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditEnrollment;
