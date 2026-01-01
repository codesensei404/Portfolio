import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import UploadForm from './components/UploadForm';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <header>
        <h1>Fullstack Portfolio 2026</h1>
        <UploadForm onUploadSuccess={() => setRefresh(!refresh)} />
      </header>
      <main>
        <ProjectList refresh={refresh} />
      </main>
    </div>
  );
}

export default App;