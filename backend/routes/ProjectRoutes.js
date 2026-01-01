import express from 'express';
import multer from 'multer';
import Project from '../models/Project.js';
import path from 'path';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// API Endpoints
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newProject = new Project({
      title, description, category,
      filePath: req.file.path,
      fileType: path.extname(req.file.originalname).toLowerCase()
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;