import React, { useState, useEffect } from 'react';
import FileManager from './components/FileManager';
import BatchQueue from './components/BatchQueue';
import OutputConfig from './components/OutputConfig';
import ProgressTracker from './components/ProgressTracker';
import OutputPreview from './components/OutputPreview';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [outputConfig, setOutputConfig] = useState({
    format: 'txt',
    outputFolder: '',
    language: 'en',
    preserveLayout: true
  });
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onProgress((data) => {
        setProgress(prev => ({
          ...prev,
          [data.fileId]: data
        }));
      });
    }
  }, []);

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = selectedFiles.map((path, index) => ({
      id: Date.now() + index,
      path,
      name: path.split('\\').pop(),
      status: 'pending',
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleStartProcessing = async () => {
    setProcessing(true);
    
    for (const file of files) {
      if (file.status === 'pending') {
        try {
          console.log('Processing file:', file.path);
          const result = await window.electronAPI.processPDF(file.path, outputConfig);
          console.log('Processing result:', result);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'completed', outputPath: result.outputPath } : f
          ));
        } catch (error) {
          console.error('Processing error:', error);
          const errorMessage = error.message || error.toString() || 'Unknown error';
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'error', error: errorMessage } : f
          ));
        }
      }
    }
    
    setProcessing(false);
  };

  const handleClearCompleted = () => {
    setFiles(prev => prev.filter(f => f.status !== 'completed'));
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>TerrificOCR</h1>
        <p>Fast and accurate OCR for your PDF documents</p>
      </header>
      
      <div className={`app-content ${previewVisible ? 'with-preview' : ''}`}>
        <div className="left-panel">
          <FileManager onFilesSelected={handleFilesSelected} />
          <OutputConfig config={outputConfig} onChange={setOutputConfig} />
        </div>
        
        <div className="right-panel">
          <BatchQueue 
            files={files}
            onRemove={handleRemoveFile}
            onClearCompleted={handleClearCompleted}
          />
          <ProgressTracker 
            files={files}
            processing={processing}
            onStart={handleStartProcessing}
          />
        </div>

        {previewVisible && (
          <div className="preview-panel">
            <OutputPreview 
              files={files}
              isVisible={previewVisible}
              onToggle={() => setPreviewVisible(false)}
            />
          </div>
        )}
      </div>

      {completedCount > 0 && !previewVisible && (
        <button 
          className="toggle-preview-btn"
          onClick={() => setPreviewVisible(true)}
        >
          📄 View Output ({completedCount})
        </button>
      )}
    </div>
  );
}

export default App;
