import React from 'react';
import MainFolder from './MainFolder';
import Subfolder from './Subfolder';
import './FolderManagement.css';

interface FileManagerProps {
  selectedFolder: any;
  onAddSubfolder: (folderId: string) => void;
  onAddFile: (folderId: string, files: FileList) => void;
  onStartUpload: (folderId: string, fileId: string) => void;
  onDeleteFile: (folderId: string, fileId: string) => void;
}

const FileManager: React.FC<FileManagerProps> = ({
  selectedFolder,
  onAddSubfolder,
  onAddFile,
  onStartUpload,
  onDeleteFile,
}) => {
  if (!selectedFolder) {
    return <div className="p-4">Please select a folder</div>;
  }

  return (
    <div className="folder-container">
      <MainFolder
        folder={selectedFolder}
        onAddSubfolder={onAddSubfolder}
        onAddFile={onAddFile}
        onStartUpload={onStartUpload}
        onDeleteFile={onDeleteFile}
      />
      
      {selectedFolder.subfolders.map((subfolder: any) => (
        <Subfolder
          key={subfolder.id}
          subfolder={subfolder}
          onAddFile={onAddFile}
          onStartUpload={onStartUpload}
          onDeleteFile={onDeleteFile}
        />
      ))}
    </div>
  );
};

export default FileManager;