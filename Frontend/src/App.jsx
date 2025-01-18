import React from 'react';
import Login from './components/Login';
import Main from './components/Main';
import Addemployee from './components/Addemployee';
import { Route, Routes } from 'react-router-dom';
// import PrivateRoutes from './components/PrivateRoutes';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route element={<PrivateRoutes/>}> */}
          <Route path="/admin" element={<Main child={<AdminPage />} />} />
          <Route path="/user" element={<Main child={<UserPage />} />} />
          <Route path="/addemployee" element={<Main child={<Addemployee />} />} />
        {/* </Route> */}
      </Routes>
  );
};

export default App;
