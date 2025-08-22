import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/students/StudentList';
import CourseList from './components/courses/CourseList';
import ClassList from './components/classes/ClassList';
import EnrollmentList from './components/enrollments/EnrollmentList';
import EnrollmentForm from './components/enrollments/EnrollmentForm';
import DepartmentList from './components/departments/DepartmentList';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Student Management System</Typography>
          <Button color="inherit" component={Link} to="/">Students</Button>
          <Button color="inherit" component={Link} to="/courses">Courses</Button>
          <Button color="inherit" component={Link} to="/classes">Classes</Button>
          <Button color="inherit" component={Link} to="/enrollments">Enrollments</Button>
          <Button color="inherit" component={Link} to="/departments">Departments</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 30 }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/enrollments" element={<EnrollmentList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/enrollments/new" element={<EnrollmentForm onEnrollmentAdded={() => {/* your logic */}} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
