import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Import the new component

const ProjectList = ({ refresh }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  // 1. Fetch projects from the backend
  useEffect(() => {
    // Note: Change 'http://localhost:5000' to your actual API URL when you host it
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, [refresh]);

  // 2. Logic to filter projects by category
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // 3. Extract unique categories for filter buttons (Dynamic approach)
  // This looks at your data and creates buttons for whatever categories exist
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  return (
    <div className="project-list-container">
      {/* Filter Navigation */}
      <div className="filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active-filter' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="project-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="no-projects">No projects found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;