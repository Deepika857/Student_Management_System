import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, CircularProgress, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';
import axios from 'axios';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDepartment, setEditDepartment] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchDepartments = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/departments')
      .then(res => setDepartments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/departments/${id}`)
      .then(() => {
        setConfirmDelete({ open: false, id: null });
        fetchDepartments();
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Department List</Typography>
      <AddDepartment onDepartmentAdded={fetchDepartments} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {departments.map(department => (
            <Grid item xs={12} sm={6} md={4} key={department.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{department.departmentName}</Typography>
                  <Typography>Department Code: {department.departmentCode}</Typography>
                  <Typography>Description: {department.description}</Typography>
                  <IconButton onClick={() => setEditDepartment(department)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setConfirmDelete({ open: true, id: department.id })}><DeleteIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Department Dialog */}
      <Dialog open={!!editDepartment} onClose={() => setEditDepartment(null)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          {editDepartment && <EditDepartment 
            department={editDepartment} 
            onSave={() => { setEditDepartment(null); fetchDepartments(); }} 
            onCancel={() => setEditDepartment(null)} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this department?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={() => handleDelete(confirmDelete.id)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DepartmentList;
