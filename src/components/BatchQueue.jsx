import React from 'react';
import './BatchQueue.css';

function BatchQueue({ files, onRemove, onClearCompleted }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '⚙️';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '📄';
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="card batch-queue">
      <div className="queue-header">
        <h2>Processing Queue ({files.length})</h2>
        {completedCount > 0 && (
          <button onClick={onClearCompleted} className="secondary small">
            Clear Completed
          </button>
        )}
      </div>
      
      {files.length === 0 ? (
        <div className="empty-state">
          <p>No files in queue</p>
          <span>Add PDF files to get started</span>
        </div>
      ) : (
        <div className="file-list">
          {files.map(file => (
            <div key={file.id} className={`file-item ${file.status}`}>
              <span className="file-icon">{getStatusIcon(file.status)}</span>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                {file.status === 'processing' && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${file.progress || 0}%` }}
                    />
                  </div>
                )}
                {file.error && (
                  <div className="error-message">{file.error}</div>
                )}
              </div>
              {file.status === 'pending' && (
                <button 
                  onClick={() => onRemove(file.id)}
                  className="remove-btn"
                  title="Remove"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BatchQueue;
