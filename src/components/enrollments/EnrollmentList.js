import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, CircularProgress, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEnrollment from './AddEnrollment';
import EditEnrollment from './EditEnrollment';
import axios from 'axios';

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEnrollment, setEditEnrollment] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchEnrollments = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/enrollments')
      .then(res => setEnrollments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/enrollments/${id}`)
      .then(() => {
        setConfirmDelete({ open: false, id: null });
        fetchEnrollments();
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Enrollment List</Typography>
      <AddEnrollment onEnrollmentAdded={fetchEnrollments} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {enrollments.map(enrollment => (
            <Grid item xs={12} sm={6} md={4} key={enrollment.enrollmentId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Enrollment ID: {enrollment.enrollmentId}</Typography>
                  <Typography>Class: {enrollment.className}</Typography>
                  <Typography>Student: {enrollment.studentName}</Typography>
                  <Typography>Enrollment Date: {enrollment.enrollmentDate}</Typography>
                  <IconButton onClick={() => setEditEnrollment(enrollment)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setConfirmDelete({ open: true, id: enrollment.enrollmentId })}><DeleteIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Enrollment Dialog */}
      <Dialog open={!!editEnrollment} onClose={() => setEditEnrollment(null)}>
        <DialogTitle>Edit Enrollment</DialogTitle>
        <DialogContent>
          {editEnrollment && <EditEnrollment enrollment={editEnrollment} onSave={() => { setEditEnrollment(null); fetchEnrollments(); }} onCancel={() => setEditEnrollment(null)} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this enrollment?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={() => handleDelete(confirmDelete.id)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}

export default EnrollmentList;
