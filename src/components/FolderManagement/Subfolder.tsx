import React, { useRef } from 'react';
import { FolderOpen, Plus, X, Upload, XCircle } from 'lucide-react';
import './FolderManagement.css';

interface SubfolderProps {
  subfolder: {
    id: string;
    name: string;
    files: any[];
  };
  onAddFile: (folderId: string, files: FileList) => void;
  onStartUpload: (folderId: string, fileId: string) => void;
  onDeleteFile: (folderId: string, fileId: string) => void;
}

const Subfolder: React.FC<SubfolderProps> = ({
  subfolder,
  onAddFile,
  onStartUpload,
  onDeleteFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFile(subfolder.id, e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="folder subfolder">
      <div className="folder-header">
        <h3 className="folder-title">
          <FolderOpen className="inline-block mr-2" size={18} />
          {subfolder.name}
        </h3>
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
          <Plus size={16} />
          Add Document
        </button>
      </div>

      <div className="file-list">
        {subfolder.files.map((file) => (
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
                    onClick={() => onStartUpload(subfolder.id, file.id)}
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                  <button
                    className="button button-warning"
                    onClick={() => onDeleteFile(subfolder.id, file.id)}
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="button"
                  onClick={() => onDeleteFile(subfolder.id, file.id)}
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

export default Subfolder;