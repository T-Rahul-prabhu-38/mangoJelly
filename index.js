const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const comicRoutes = require('./routes/comicBookRoute.js');

require('dotenv').config();
const app = express();

//adding databse-connection
connectDB();

// Middlewares added here
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes introduced here
app.use('/api/comics', comicRoutes);


// Error Handling done here
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
