const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

// CORS (allow all for now, ingress will handle later)
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// MongoDB (from env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));