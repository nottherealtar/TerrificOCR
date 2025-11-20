import React, { useState } from 'react';
import './FileManager.css';

function FileManager({ onFilesSelected }) {
  const [dragActive, setDragActive] = useState(false);

  const handleSelectFiles = async () => {
    const files = await window.electronAPI.selectFiles();
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleSelectFolder = async () => {
    const folder = await window.electronAPI.selectFolder();
    if (folder) {
      // TODO: Scan folder for PDFs
      console.log('Selected folder:', folder);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files)
      .filter(f => f.name.endsWith('.pdf'))
      .map(f => f.path);
    
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div className="card file-manager">
      <h2>Add Files</h2>
      
      <div 
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Drag & drop PDF files here</p>
        <span>or</span>
      </div>
      
      <div className="button-group">
        <button onClick={handleSelectFiles}>
          Browse Files
        </button>
        <button onClick={handleSelectFolder} className="secondary">
          Select Folder
        </button>
      </div>
    </div>
  );
}

export default FileManager;
