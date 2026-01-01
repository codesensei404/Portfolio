import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({ title: '', desc: '', cat: 'Web' });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.desc);
    data.append('category', formData.cat);
    data.append('file', file);

    await axios.post('http://localhost:5000/api/projects/upload', data);
    onUploadSuccess();
    alert("Project Uploaded!");
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} required />
      <select onChange={e => setFormData({...formData, cat: e.target.value})}>
        <option value="Web">Web Dev</option>
        <option value="Mobile">Mobile</option>
        <option value="Design">Design</option>
      </select>
      <input type="file" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload Project</button>
    </form>
  );
};

export default UploadForm;