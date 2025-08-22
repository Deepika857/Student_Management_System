import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, CircularProgress, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchStudents = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/students')
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/students/${id}`)
      .then(() => {
        setConfirmDelete({ open: false, id: null });
        fetchStudents();
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Student List</Typography>
      <AddStudent onStudentAdded={fetchStudents} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {students.map(student => (
            <Grid item xs={12} sm={6} md={4} key={student.studentId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{student.firstName}</Typography>
                  <Typography color="textSecondary">{student.email}</Typography>
                  <Typography>Phone: {student.phoneNumber}</Typography>
                  <Typography>Gender: {student.gender}</Typography>
                  <IconButton onClick={() => setEditStudent(student)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setConfirmDelete({ open: true, id: student.studentId })}><DeleteIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Student Dialog */}
      <Dialog open={!!editStudent} onClose={() => setEditStudent(null)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {editStudent && <EditStudent student={editStudent} onSave={() => { setEditStudent(null); fetchStudents(); }} onCancel={() => setEditStudent(null)} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this student?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={() => handleDelete(confirmDelete.id)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentList;