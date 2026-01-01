import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);