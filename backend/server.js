import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Project, MathTopic, Algorithm } from './models/index.js';
import resumeRoutes from './routes/resume.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://agahanov.com',
    'https://www.agahanov.com',
    'https://dark-math-horizon.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Health Check
app.get('/api', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Dark Math Horizon API is running',
    endpoints: ['/api/projects', '/api/math-topics', '/api/algorithms', '/api/resume']
  });
});

// Serve uploaded files
app.use('/api/uploads', express.static('uploads'));

// API Routes
app.use('/api/resume', resumeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes for Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes for Math Topics
app.get('/api/math-topics', async (req, res) => {
  try {
    const topics = await MathTopic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/math-topics', async (req, res) => {
  try {
    const topic = new MathTopic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/math-topics/:id', async (req, res) => {
  try {
    const result = await MathTopic.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Math topic not found' });
    }
    res.json({ message: 'Math topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes for Algorithms
app.get('/api/algorithms', async (req, res) => {
  try {
    const algorithms = await Algorithm.find().sort({ createdAt: -1 });
    res.json(algorithms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/algorithms', async (req, res) => {
  try {
    const algorithm = new Algorithm(req.body);
    await algorithm.save();
    res.status(201).json(algorithm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/algorithms/:id', async (req, res) => {
  try {
    const result = await Algorithm.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Algorithm not found' });
    }
    res.json({ message: 'Algorithm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
