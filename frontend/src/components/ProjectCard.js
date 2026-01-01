import React from 'react';

const ProjectCard = ({ project }) => {
  // Construct the full URL for the hosted file
  // In production, 'http://localhost:5000' should be your Render/backend URL
  const fileUrl = `http://localhost:5000/${project.filePath.replace(/\\/g, '/')}`;
  
  const renderPreview = () => {
    const extension = project.fileType;

    // 1. Handle Images
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension)) {
      return (
        <div className="preview-box">
          <img src={fileUrl} alt={project.title} className="card-img" />
        </div>
      );
    }

    // 2. Handle PDFs (Uses an iframe to view inside the browser)
    if (extension === '.pdf') {
      return (
        <div className="preview-box">
          <iframe src={fileUrl} title={project.title} className="pdf-preview" />
          <p className="text-sm text-gray-500">Previewing PDF</p>
        </div>
      );
    }

    // 3. Handle Word or Other Files (Provides a download/view link)
    return (
      <div className="preview-box file-placeholder">
        <div className="icon">📄</div>
        <p>{extension.toUpperCase()} File</p>
        <a href={fileUrl} target="_blank" rel="noreferrer" className="download-btn">
          Open / Download File
        </a>
      </div>
    );
  };

  return (
    <div className="project-card">
      {renderPreview()}
      <div className="card-content">
        <span className="category-tag">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;