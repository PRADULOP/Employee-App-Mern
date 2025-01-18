import React, { useEffect, useState } from 'react';
import {TextField, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'
import axiosInstance from '../axiosInterceptor';


const Addemployee = () => {
  const [employeeData, setEmployeeData] = useState({
    employeeID: '',
    name: '',
    designation: '',
    salary: '',
    department: '',
    location: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const updateValue = () => {
    if (location.state != null) {
      
    axiosInstance.put(`http://localhost:3000/employee/update/${location.state.val._id}`, employeeData)
        .then((res) => {
          alert(res.data);
          navigate('/admin');
        })
        .catch((error) => {
          alert('Error updating employee');
        });
    } else {
      if (
        !employeeData.employeeID ||
        !employeeData.name ||
        !employeeData.designation ||
        !employeeData.salary ||
        !employeeData.department ||
        !employeeData.location
      ) {
        alert("Please fill in all fields before submitting.");
        return; 
      }
      
    axiosInstance.post('http://localhost:3000/employee/add', employeeData)
        .then((res) => {
          alert(res.data);
          navigate('/admin');
        })
        .catch((error) => {
          alert('Error adding employee');
        });
    }
  };

 
  useEffect(() => {
    if (location.state != null) {
      setEmployeeData({
        ...employeeData,
        employeeID: location.state.val.employeeID,
        name: location.state.val.name,
        designation: location.state.val.designation,
        salary: location.state.val.salary,
        department: location.state.val.department,
        location: location.state.val.location,
      });
    } else {
      setEmployeeData({
        employeeID: '',
        name: '',
        designation: '',
        salary: '',
        department: '',
        location: '',
      });
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '10%', marginRight:'170px' }}>
      <Grid>
        <Typography variant="h4" style={{ color: 'red', fontWeight: 'bold' }}>
          {location.state ? 'EDIT EMPLOYEE' : 'ADD NEW EMPLOYEE'}
        </Typography>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Employee ID"
            variant="outlined"
            name="employeeID"
            value={employeeData.employeeID}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, employeeID: e.target.value });
            }}
        
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Name"
            variant="outlined"
            name="name"
            value={employeeData.name}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, name: e.target.value });
            }}
            
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Designation"
            variant="outlined"
            name="designation"
            value={employeeData.designation}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, designation: e.target.value });
            }}
            
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Salary"
            variant="outlined"
            name="salary"
            value={employeeData.salary}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, salary: e.target.value });
            }}
            
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Department"
            variant="outlined"
            name="department"
            value={employeeData.department}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, department: e.target.value });
            }}
            
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            className="textField"
            label="Location"
            variant="outlined"
            name="location"
            value={employeeData.location}
            onChange={(e) => {
              setEmployeeData({ ...employeeData, location: e.target.value });
            }}
            
          />
        </Grid>
        <br />
        <Grid>
          <Button color="error" variant="contained" onClick={updateValue}>
            {location.state ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Addemployee;
