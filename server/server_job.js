const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Job = require('./components/jobPosting/JobListing-upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobPortal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Body parser middleware
app.use(bodyParser.json());

// Define routes
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, description } = req.body;
    const job = new Job({
      title,
      description
    });
    await job.save();
    res.status(201).json({ success: true, message: 'Job posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
