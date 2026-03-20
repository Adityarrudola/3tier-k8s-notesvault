const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const noteRoutes = require('./routes/noteRoutes');
const seedDB = require('./seed'); // seed file

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// MongoDB connection + seeding
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // Seed data (runs only if DB empty)
    await seedDB();
  })
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});