import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import axiosInstance from '../axiosInterceptor';

const AdminPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('http://localhost:3000/employee')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
      });
  }, []);

  const handleUpdate = (val) => {
    navigate('/addemployee', { state: { val } });
  };

  const handleDelete = (val) => {
    axiosInstance.delete(`http://localhost:3000/employee/delete/${val._id}`)
      .then((res) => {
        alert(res.data);
        setEmployees(employees.filter(item => item._id !== val._id));
      })
      .catch((err) => {
        console.error('Error deleting employee:', err);
      });
  };

  return (
    <div style={{ margin: '5%' }}>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid key={employee._id} item xs={12} sm={6} md={4}>  
            <Card sx={{ height: '250px',  
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',width: '300px' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography style={{fontWeight:'bold'}} gutterBottom variant="h5" component="div">
                  {employee.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Employee ID: {employee.employeeID}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Position: {employee.designation}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Department: {employee.department}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Salary: {employee.salary}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Location: {employee.location}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={() => handleUpdate(employee)}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(employee)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminPage;
