import React, { useRef } from 'react';
import { Folder, File, Plus, X, Upload, XCircle } from 'lucide-react';
import './FolderManagement.css';

interface MainFolderProps {
  folder: {
    id: string;
    name: string;
    subfolders: any[];
    files: any[];
  };
  onAddSubfolder: (folderId: string) => void;
  onAddFile: (folderId: string, files: FileList) => void;
  onStartUpload: (folderId: string, fileId: string) => void;
  onDeleteFile: (folderId: string, fileId: string) => void;
}

const MainFolder: React.FC<MainFolderProps> = ({
  folder,
  onAddSubfolder,
  onAddFile,
  onStartUpload,
  onDeleteFile,
}) => {
const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(folder.id, e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="folder">
      <div className="folder-header">
        <h2 className="folder-title">
          <Folder className="inline-block mr-2" size={20} />
          {folder.name}
        </h2>
        <div className="folder-actions">
          <button
            className="button button-primary"
            onClick={() => onAddSubfolder(folder.id)}
          >
            <Plus size={16} />
            Add Folder
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            multiple
          />
          <button
            className="button button-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <File size={16} />
            Add Document
          </button>
        </div>
      </div>

      <div className="file-list">
        {folder.files.map((file) => (
          <div key={file.id} className="file-item">
            <div className="file-info">
              <div
                className={`file-status ${
                  file.status === 'pending' ? 'status-pending' : 'status-completed'
                }`}
              />
              <span>{file.name}</span>
            </div>
            <div className="file-actions">
              {file.status === 'pending' ? (
                <>
                  <button
                    className="button button-primary"
                    onClick={() => onStartUpload(folder.id, file.id)}
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                  <button
                    className="button button-warning"
                    onClick={() => onDeleteFile(folder.id, file.id)}
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="button"
                  onClick={() => onDeleteFile(folder.id, file.id)}
                >
                  <X size={16} />
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFolder;