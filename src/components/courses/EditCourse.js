import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import axios from 'axios';

function EditCourse({ course, onSave, onCancel }) {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    roomNumber: '',
    teacherId: '',
    departmentId: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/teachers')
      .then(res => setTeachers(res.data))
      .catch(() => setError('Failed to load teachers.'));
    axios.get('http://localhost:8080/api/departments')
      .then(res => setDepartments(res.data))
      .catch(() => setError('Failed to load departments.'));
  }, []);

  useEffect(() => {
    if (course) {
      setFormData({
        courseName: course.courseName,
        courseCode: course.courseCode,
        roomNumber: course.roomNumber,
        teacherId: course.teacherId || '', // existing linked teacher's id
        departmentId: course.departmentId || '' // existing linked department's id
      });
    }
  }, [course]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/courses/${course.courseId}`, formData)
      .then(() => {
        setError('');
        onSave();
      })
      .catch(() => setError('Failed to update course. Please check the entered data.'));
  };

  if (!course) return null;

  return (
    <Box p={2} minWidth={400}>
      <Typography variant="h5" gutterBottom>Edit Course</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Course Name"
          value={formData.courseName}
          onChange={handleChange('courseName')}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Course Code"
          value={formData.courseCode}
          onChange={handleChange('courseCode')}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Room Number"
          value={formData.roomNumber}
          onChange={handleChange('roomNumber')}
          required
          fullWidth
          margin="normal"
        />

        {/* Teacher dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Teacher</InputLabel>
          <Select
            value={formData.teacherId}
            onChange={handleChange('teacherId')}
            label="Teacher"
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {teachers.map(teacher => (
              <MenuItem key={teacher.teacherId || teacher.id} value={teacher.teacherId || teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Department dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Department</InputLabel>
          <Select
            value={formData.departmentId}
            onChange={handleChange('departmentId')}
            label="Department"
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {departments.map(dept => (
              <MenuItem key={dept.departmentId || dept.id} value={dept.departmentId || dept.id}>
                {dept.departmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditCourse;
