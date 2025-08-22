import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box
} from '@mui/material';
import axios from 'axios';

function EnrollmentForm({ onEnrollmentAdded }) {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes')
      .then(response => setClasses(response.data))
      .catch(() => setError('Failed to load classes.'));
    axios.get('http://localhost:8080/api/students')
      .then(response => setStudents(response.data))
      .catch(() => setError('Failed to load students.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!selectedClassId) {
      setError('Please select a class.');
      return;
    }
    if (!selectedStudentId) {
      setError('Please select a student.');
      return;
    }
    if (!enrollmentDate) {
      setError('Please select an enrollment date.');
      return;
    }

    const enrollmentData = {
      classId: selectedClassId,
      studentId: selectedStudentId,
      enrollmentDate: enrollmentDate // ISO format, e.g. 2025-08-19
    };

    axios.post('http://localhost:8080/api/enrollments', enrollmentData)
      .then(() => {
        setSelectedClassId('');
        setSelectedStudentId('');
        setEnrollmentDate('');
        if (onEnrollmentAdded) onEnrollmentAdded();
      })
      .catch(() => {
        setError('Failed to add enrollment. Please check the entered data.');
      });
  };

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300" maxWidth={900} mx="auto">
      <Typography variant="h5" gutterBottom>Add New Enrollment</Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
      <form onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Class</InputLabel>
          <Select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            label="Class"
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {classes.map(cls => (
              <MenuItem key={cls.enrollmentId || cls.id} value={cls.enrollmentId || cls.id}>
                {cls.className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Student</InputLabel>
          <Select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            label="Student"
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {students.map(std => (
              <MenuItem key={std.studentId || std.id} value={std.studentId || std.id}>
                {std.firstName} {std.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Enrollment Date"
          type="date"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          ADD ENROLLMENT
        </Button>
      </form>
    </Box>
  );
}

export default EnrollmentForm;
