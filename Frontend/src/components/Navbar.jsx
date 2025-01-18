import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem('userRole'); 

  function handleLogout() {
    sessionStorage.removeItem('logintoken');
    sessionStorage.removeItem('userRole');
    navigate('/');
    window.location.reload();
  }

  const handleHomeNavigation = () => {
    if (userRole === 'admin') {
      navigate('/admin'); 
    } else if (userRole === 'user') {
      navigate('/user');   
    } else {
      navigate('/');       
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar style={{ backgroundColor: 'black' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WorkMate
            </Typography>
            
            
            <Button style={{ color: 'white' }} onClick={handleHomeNavigation}>
              Home
            </Button>

            
            {userRole === 'admin' && (
              <>
                <Link to="/addemployee">
                  <Button style={{ color: 'white' }}>Add Employee</Button>
                </Link>
              </>
            )}

            
            <Button style={{ color: 'white' }} onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
