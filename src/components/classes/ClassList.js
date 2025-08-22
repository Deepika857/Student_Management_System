import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, CircularProgress, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddClass from './AddClass';
import EditClass from './EditClass';
import axios from 'axios';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClass, setEditClass] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchClasses = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/classes')
      .then(res => setClasses(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/classes/${id}`)
      .then(() => {
        setConfirmDelete({ open: false, id: null });
        fetchClasses();
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Class List</Typography>
      <AddClass onClassAdded={fetchClasses} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {classes.map(cls => (
            <Grid item xs={12} sm={6} md={4} key={cls.enrollmentId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{cls.className}</Typography>
                  <Typography>Start: {cls.startTime}</Typography>
                  <Typography>End: {cls.endTime}</Typography>
                  <Typography>Grade: {cls.grade}</Typography>
                  <Typography>Room: {cls.roomNumber}</Typography>
                  <IconButton onClick={() => setEditClass(cls)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setConfirmDelete({ open: true, id: cls.enrollmentId })}><DeleteIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Class Dialog */}
      <Dialog open={!!editClass} onClose={() => setEditClass(null)}>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          {editClass && <EditClass classData={editClass} onSave={() => { setEditClass(null); fetchClasses(); }} onCancel={() => setEditClass(null)} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this class?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={() => handleDelete(confirmDelete.id)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClassList;
