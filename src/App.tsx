import React, { useState, useEffect } from 'react';
import NavigationBar from './components/Navigation/NavigationBar';
import FileManager from './components/FolderManagement/FileManager';
import './App.css';

interface Folder {
  id: string;
  name: string;
  subfolders: Subfolder[];
  files: File[];
}

interface Subfolder {
  id: string;
  name: string;
  files: File[];
}

interface File {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  file?: globalThis.File;
}

interface PopupProps {
  title: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, onSubmit, onClose }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            autoFocus
          />
          <div className="popup-actions">
            <button type="submit" className="button button-primary">Create</button>
            <button type="button" className="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  const [showSubfolderPopup, setShowSubfolderPopup] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folderId = params.get('folder');
    if (folderId) {
      setSelectedFolderId(folderId);
    }
  }, []);

  useEffect(() => {
    if (selectedFolderId !== null) {
      const newUrl = selectedFolderId
        ? `${window.location.pathname}?folder=${selectedFolderId}`
        : window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  }, [selectedFolderId]);

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
    if (currentHistoryIndex < navigationHistory.length - 1) {
      setNavigationHistory(prev => prev.slice(0, currentHistoryIndex + 1));
    }
    setNavigationHistory(prev => [...prev, folderId]);
    setCurrentHistoryIndex(prev => prev + 1);
    setStep(folders.findIndex(folder => folder.id === folderId));
  };

  const createFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      subfolders: [],
      files: [],
    };
    setFolders([...folders, newFolder]);
    setSelectedFolderId(newFolder.id);
    setStep(folders.length);
    setShowFolderPopup(false);
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
    setStep(Math.max(0, step - 1));
  };

  const addSubfolder = (folderId: string, name: string) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          return {
            ...folder,
            subfolders: [
              ...folder.subfolders,
              {
                id: `subfolder-${Date.now()}`,
                name,
                files: [],
              },
            ],
          };
        }
        return folder;
      })
    );
    setShowSubfolderPopup(false);
  };

  const handleFileUpload = (folderId: string, uploadedFiles: FileList) => {
    const files = Array.from(uploadedFiles).map((file) => ({
      id: `file-${Date.now()}-${file.name}`,
      name: file.name,
      status: 'pending' as const,
      file,
    }));

    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          return {
            ...folder,
            files: [...folder.files, ...files],
          };
        }

        const updatedSubfolders = folder.subfolders.map((subfolder) => {
          if (subfolder.id === folderId) {
            return {
              ...subfolder,
              files: [...subfolder.files, ...files],
            };
          }
          return subfolder;
        });

        return {
          ...folder,
          subfolders: updatedSubfolders,
        };
      })
    );
  };

  const startFileUpload = (folderId: string, fileId: string) => {
    setTimeout(() => {
      setFolders((currentFolders) =>
        currentFolders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              files: folder.files.map((f) =>
                f.id === fileId ? { ...f, status: 'completed' as const } : f
              ),
            };
          }

          const updatedSubfolders = folder.subfolders.map((subfolder) => {
            if (subfolder.id === folderId) {
              return {
                ...subfolder,
                files: subfolder.files.map((f) =>
                  f.id === fileId ? { ...f, status: 'completed' as const } : f
                ),
              };
            }
            return subfolder;
          });

          return {
            ...folder,
            subfolders: updatedSubfolders,
          };
        })
      );
    }, 2000);
  };

  const deleteFile = (folderId: string, fileId: string) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          return {
            ...folder,
            files: folder.files.filter((file) => file.id !== fileId),
          };
        }

        const updatedSubfolders = folder.subfolders.map((subfolder) => {
          if (subfolder.id === folderId) {
            return {
              ...subfolder,
              files: subfolder.files.filter((file) => file.id !== fileId),
            };
          }
          return subfolder;
        });

        return {
          ...folder,
          subfolders: updatedSubfolders,
        };
      })
    );
  };

  const selectedFolder = folders.find((folder) => folder.id === selectedFolderId);

  return (
    <>
    <h1 className="page-heading">File Management System</h1>
    <div className="min-h-screen bg-gray-100">
      <NavigationBar
        folders={folders}
        selectedFolder={selectedFolderId}
        onFolderSelect={handleFolderSelect}
        onCreateFolder={() => setShowFolderPopup(true)}
        onDeleteFolder={deleteFolder}
      />
    
      
      <FileManager
        selectedFolder={selectedFolder}
        onAddSubfolder={() => setShowSubfolderPopup(true)}
        onAddFile={handleFileUpload}
        onStartUpload={startFileUpload}
        onDeleteFile={deleteFile}
      />

      {showFolderPopup && (
        <Popup
          title="Create New Folder"
          onSubmit={createFolder}
          onClose={() => setShowFolderPopup(false)}
        />
      )}

      {showSubfolderPopup && selectedFolder && (
        <Popup
          title="Create New Subfolder"
          onSubmit={(name) => addSubfolder(selectedFolder.id, name)}
          onClose={() => setShowSubfolderPopup(false)}
        />
      )}
    </div>
    </>
  );
}

export default App;