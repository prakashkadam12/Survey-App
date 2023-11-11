// server.js
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const cors = require('cors'); // Import the cors middleware
const dotenv = require('dotenv');
const surveyRoutes = require('./routes/surveyRoutes');

const app = express();
app.use(express.json())

dotenv.config();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
database.connect();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Routes
app.use('/api/surveys', surveyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
