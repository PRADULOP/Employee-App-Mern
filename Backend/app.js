require('dotenv').config();
require('./db/connection')

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());


const morgan = require('morgan');
app.use(morgan('dev'));


const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employee',employeeRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });