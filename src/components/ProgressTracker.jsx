import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ files, processing, onStart }) {
  const pendingCount = files.filter(f => f.status === 'pending').length;
  const processingCount = files.filter(f => f.status === 'processing').length;
  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  const totalProgress = files.length > 0 
    ? Math.round((completedCount / files.length) * 100) 
    : 0;

  return (
    <div className="card progress-tracker">
      <h2>Progress</h2>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{processingCount}</div>
          <div className="stat-label">Processing</div>
        </div>
        <div className="stat-item success">
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item error">
          <div className="stat-value">{errorCount}</div>
          <div className="stat-label">Errors</div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="overall-progress">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span className="progress-percentage">{totalProgress}%</span>
          </div>
          <div className="progress-bar-large">
            <div 
              className="progress-fill-large" 
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      )}

      <button 
        onClick={onStart}
        disabled={processing || pendingCount === 0}
        className={processing ? 'secondary' : ''}
      >
        {processing ? 'Processing...' : `Start Processing (${pendingCount})`}
      </button>
    </div>
  );
}

export default ProgressTracker;
