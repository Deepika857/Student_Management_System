import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box
} from '@mui/material';
import axios from 'axios';

function AddCourse({ onCourseAdded }) {
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
      .then(response => setTeachers(response.data))
      .catch(() => setError('Failed to load teachers.'));
    axios.get('http://localhost:8080/api/departments')
      .then(response => setDepartments(response.data))
      .catch(() => setError('Failed to load departments.'));
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.courseName ||
      !formData.courseCode ||
      !formData.roomNumber ||
      !formData.teacherId ||
      !formData.departmentId
    ) {
      setError('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:8080/api/courses', formData)
      .then(() => {
        setFormData({
          courseName: '',
          courseCode: '',
          roomNumber: '',
          teacherId: '',
          departmentId: ''
        });
        if (onCourseAdded) onCourseAdded();
        setError('');
      })
      .catch(() => setError('Failed to add course. Please check the entered data.'));
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300" maxWidth={900} mx="auto">
      <Typography variant="h5" gutterBottom>Add New Course</Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Course Name"
          value={formData.courseName}
          onChange={handleChange('courseName')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Course Code"
          value={formData.courseCode}
          onChange={handleChange('courseCode')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Room Number"
          value={formData.roomNumber}
          onChange={handleChange('roomNumber')}
          fullWidth
          margin="normal"
          required
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          ADD COURSE
        </Button>
      </form>
    </Box>
  );
}

export default AddCourse;
