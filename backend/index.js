const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// MongoDB (rename DB optional but cleaner)
mongoose.connect('mongodb://127.0.0.1:27017/notesapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Server
app.listen(5001, () => console.log('Server running on port 5001'));