import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};

    if (!form.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      validationErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      axios.post('http://localhost:3000/user/login', form)
        .then((res) => {
          if (res.data.token) {
            sessionStorage.setItem('logintoken', res.data.token);
            sessionStorage.setItem('userRole', res.data.role);
            console.log(res.data.role)


            if (res.data.role === 'admin') {
              navigate('/admin');  
            } else {
              navigate('/user');  
            }
          } else {
            alert('Login failed! Please try again.');
            navigate('/');
          }
        })
        .catch((error) => {
          alert('Login failed! Please try again.');
        });
    }
  };

  return (
    <div style={{ margin: '10%', textAlign: 'center' }}>
      <Typography variant="h4" style={{ color: 'red', fontWeight: 'bold', marginRight:'25px'}}>
        Login
      </Typography>
      <br />
      <br />
      <div>
        <TextField
          className="textField"
          label="Email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>
      <br />
      <br />
      <div>
        <TextField
          className="textField"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={!!errors.password}
          helperText={errors.password}
        />
      </div>
      <br />
      <br />
      <Button color="primary" variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <br />
      <br />
    </div>
  );
};

export default Login;
