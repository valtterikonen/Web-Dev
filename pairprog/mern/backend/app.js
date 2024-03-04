const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
// connectDB();

// Routes
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => res.send('Hello'));

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to db");
  })
  .catch((error) => {
    logger.error(error);
  });
// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
