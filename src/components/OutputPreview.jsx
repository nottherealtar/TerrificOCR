import React, { useState, useEffect, useRef } from 'react';
import './OutputPreview.css';

function OutputPreview({ files, isVisible, onToggle }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputText, setOutputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const textRef = useRef(null);

  const completedFiles = files.filter(f => f.status === 'completed' && f.outputPath);

  useEffect(() => {
    if (selectedFile && selectedFile.outputPath) {
      loadOutputFile(selectedFile.outputPath);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (searchQuery && outputText) {
      performSearch();
    } else {
      setSearchResults([]);
      setCurrentResultIndex(0);
    }
  }, [searchQuery, outputText]);

  const loadOutputFile = async (filePath) => {
    try {
      const text = await window.electronAPI.readOutputFile(filePath);
      setOutputText(text);
    } catch (error) {
      setOutputText(`Error loading file: ${error.message}`);
    }
  };

  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const lines = outputText.split('\n');
    const results = [];

    lines.forEach((line, lineIndex) => {
      const lowerLine = line.toLowerCase();
      let startIndex = 0;
      
      while ((startIndex = lowerLine.indexOf(query, startIndex)) !== -1) {
        results.push({
          lineIndex,
          charIndex: startIndex,
          line: line,
          context: getContext(lines, lineIndex)
        });
        startIndex += query.length;
      }
    });

    setSearchResults(results);
    setCurrentResultIndex(0);
    
    if (results.length > 0) {
      scrollToResult(0);
    }
  };

  const getContext = (lines, lineIndex) => {
    const start = Math.max(0, lineIndex - 1);
    const end = Math.min(lines.length, lineIndex + 2);
    return lines.slice(start, end).join('\n');
  };

  const scrollToResult = (index) => {
    if (searchResults.length === 0 || !textRef.current) return;
    
    const result = searchResults[index];
    const lines = outputText.split('\n');
    const charPosition = lines.slice(0, result.lineIndex).join('\n').length + result.charIndex;
    
    // Highlight the text
    setCurrentResultIndex(index);
  };

  const nextResult = () => {
    if (searchResults.length === 0) return;
    const nextIndex = (currentResultIndex + 1) % searchResults.length;
    scrollToResult(nextIndex);
  };

  const prevResult = () => {
    if (searchResults.length === 0) return;
    const prevIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length;
    scrollToResult(prevIndex);
  };

  const highlightText = () => {
    if (!searchQuery || searchResults.length === 0) {
      return outputText;
    }

    const lines = outputText.split('\n');
    return lines.map((line, lineIndex) => {
      const lowerLine = line.toLowerCase();
      const query = searchQuery.toLowerCase();
      let lastIndex = 0;
      const parts = [];
      
      let startIndex = 0;
      while ((startIndex = lowerLine.indexOf(query, startIndex)) !== -1) {
        // Add text before match
        if (startIndex > lastIndex) {
          parts.push(line.substring(lastIndex, startIndex));
        }
        
        // Check if this is the current result
        const isCurrentResult = searchResults[currentResultIndex]?.lineIndex === lineIndex &&
                                searchResults[currentResultIndex]?.charIndex === startIndex;
        
        // Add highlighted match
        parts.push(
          <mark key={`${lineIndex}-${startIndex}`} className={isCurrentResult ? 'current' : ''}>
            {line.substring(startIndex, startIndex + query.length)}
          </mark>
        );
        
        lastIndex = startIndex + query.length;
        startIndex = lastIndex;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      return <div key={lineIndex}>{parts.length > 0 ? parts : line}</div>;
    });
  };

  if (!isVisible) return null;

  return (
    <div className="output-preview">
      <div className="preview-header">
        <h2>Output Preview</h2>
        <button onClick={onToggle} className="close-btn" title="Close Preview">
          ×
        </button>
      </div>

      {completedFiles.length === 0 ? (
        <div className="empty-preview">
          <p>No completed files yet</p>
          <span>Process some PDFs to see output here</span>
        </div>
      ) : (
        <>
          <div className="file-selector">
            <label>Select File:</label>
            <select 
              value={selectedFile?.id || ''} 
              onChange={(e) => {
                const file = completedFiles.find(f => f.id === parseInt(e.target.value));
                setSelectedFile(file);
              }}
            >
              <option value="">Choose a file...</option>
              {completedFiles.map(file => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFile && (
            <>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search in output..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <div className="search-controls">
                    <span className="search-count">
                      {currentResultIndex + 1} / {searchResults.length}
                    </span>
                    <button onClick={prevResult} className="nav-btn" title="Previous">
                      ↑
                    </button>
                    <button onClick={nextResult} className="nav-btn" title="Next">
                      ↓
                    </button>
                  </div>
                )}
              </div>

              <div className="output-content" ref={textRef}>
                {outputText ? highlightText() : 'Loading...'}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OutputPreview;
