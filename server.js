const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// Load environment variables
dotenv.config();

// MongoDB URI and Connection
const dbURI = process.env.DB;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Import User Model
const apiController = require('./fnb_on_search_controller.js');

// Routes

// CREATE: Add a new user
app.post('/on_search', async (req, res) => {
  try {
    await apiController.onSearch(req, res)
    // res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
