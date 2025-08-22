import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, CircularProgress, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchCourses = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/courses')
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/courses/${id}`)
      .then(() => {
        setConfirmDelete({ open: false, id: null });
        fetchCourses();
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Course List</Typography>
      <AddCourse onCourseAdded={fetchCourses} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.courseId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course.courseName}</Typography>
                  <Typography>Course Code: {course.courseCode}</Typography>
                  <Typography>Room Number: {course.roomNumber}</Typography>
                  <IconButton onClick={() => setEditCourse(course)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setConfirmDelete({ open: true, id: course.courseId })}><DeleteIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Course Dialog */}
      <Dialog open={!!editCourse} onClose={() => setEditCourse(null)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          {editCourse && <EditCourse course={editCourse} onSave={() => { setEditCourse(null); fetchCourses(); }} onCancel={() => setEditCourse(null)} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this course?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={() => handleDelete(confirmDelete.id)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CourseList;
