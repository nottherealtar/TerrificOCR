const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

function startPythonService() {
  const pythonScript = path.join(__dirname, '../python/ocr_service.py');
  
  // Use bundled Python if available, otherwise system Python
  let pythonPath = 'python';
  if (app.isPackaged) {
    const bundledPython = path.join(process.resourcesPath, 'python-embed', 'python.exe');
    if (require('fs').existsSync(bundledPython)) {
      pythonPath = bundledPython;
      console.log('Using bundled Python:', bundledPython);
    }
  }
  
  pythonProcess = spawn(pythonPath, [pythonScript]);
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  startPythonService();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Kill Python process
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
  // Quit app on all platforms (including macOS)
  app.quit();
});

// Handle app quit
app.on('before-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
});

// Handle window close
app.on('window-all-closed', () => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
  app.quit();
});

// IPC Handlers
ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
  });
  return result.filePaths;
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('select-output-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('process-pdf', async (event, { filePath, options }) => {
  return new Promise((resolve, reject) => {
    // Determine Python script path based on environment
    let pythonScript;
    let pythonPath = 'python';
    
    if (app.isPackaged) {
      // Production: scripts are in resources folder
      pythonScript = path.join(process.resourcesPath, 'python', 'process_pdf.py');
      const bundledPython = path.join(process.resourcesPath, 'python-embed', 'python.exe');
      if (require('fs').existsSync(bundledPython)) {
        pythonPath = bundledPython;
      }
    } else {
      // Development: scripts are relative to electron folder
      pythonScript = path.join(__dirname, '../python/process_pdf.py');
    }
    
    console.log('Python path:', pythonPath);
    console.log('Script path:', pythonScript);
    
    const args = [pythonScript, filePath, JSON.stringify(options)];
    
    const childProcess = spawn(pythonPath, args);
    let output = '';
    let error = '';
    let outputPath = '';
    
    childProcess.stdout.on('data', (data) => {
      const dataStr = data.toString();
      output += dataStr;
      console.log('Python stdout:', dataStr);
      
      // Send progress updates
      try {
        const progress = JSON.parse(dataStr);
        if (progress.outputPath) {
          outputPath = progress.outputPath;
        }
        event.sender.send('ocr-progress', progress);
      } catch (e) {
        // Not JSON, regular output
      }
    });
    
    childProcess.stderr.on('data', (data) => {
      const errorStr = data.toString();
      error += errorStr;
      console.error('Python stderr:', errorStr);
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output, outputPath });
      } else {
        const errorMsg = error || 'Python process failed';
        console.error('Python process error:', errorMsg);
        console.error('Exit code:', code);
        reject(new Error(errorMsg));
      }
    });
  });
});

ipcMain.handle('read-output-file', async (event, filePath) => {
  try {
    const fs = require('fs').promises;
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
});
