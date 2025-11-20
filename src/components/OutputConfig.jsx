import React from 'react';
import './OutputConfig.css';

function OutputConfig({ config, onChange }) {
  const handleOutputFolderSelect = async () => {
    const folder = await window.electronAPI.selectOutputFolder();
    if (folder) {
      onChange({ ...config, outputFolder: folder });
    }
  };

  return (
    <div className="card output-config">
      <h2>Output Settings</h2>
      
      <div className="form-group">
        <label>Output Format</label>
        <select 
          value={config.format}
          onChange={(e) => onChange({ ...config, format: e.target.value })}
        >
          <option value="txt">Plain Text (.txt)</option>
          <option value="pdf">Searchable PDF</option>
          <option value="markdown">Markdown (.md)</option>
          <option value="json">JSON (.json)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Output Folder</label>
        <div className="folder-select">
          <input 
            type="text" 
            value={config.outputFolder || 'Same as source'} 
            readOnly 
            placeholder="Same as source"
          />
          <button onClick={handleOutputFolderSelect} className="secondary">
            Browse
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Language</label>
        <select 
          value={config.language}
          onChange={(e) => onChange({ ...config, language: e.target.value })}
        >
          <option value="en">English</option>
          <option value="ch">Chinese</option>
          <option value="fr">French</option>
          <option value="german">German</option>
          <option value="japan">Japanese</option>
          <option value="korean">Korean</option>
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input 
            type="checkbox"
            checked={config.preserveLayout}
            onChange={(e) => onChange({ ...config, preserveLayout: e.target.checked })}
          />
          <span>Preserve document layout</span>
        </label>
      </div>
    </div>
  );
}

export default OutputConfig;
