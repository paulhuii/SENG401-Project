const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGO, {})
  .then(() => console.log('Universal connection to MongoDB established'))
  .catch(err => console.error('Connection error:', err));

const db = mongoose.createConnection(process.env.MONGO);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB db');
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
let server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app, closeServer: () => server && server.close() };
