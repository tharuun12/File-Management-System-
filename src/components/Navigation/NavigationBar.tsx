import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Navigation.css';

interface Folder {
  id: string;
  name: string;
}

interface NavigationBarProps {
  folders: Folder[];
  selectedFolder: string | null;
  onFolderSelect: (folderId: string) => void;
  onCreateFolder: () => void;
  onDeleteFolder: (folderId: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  folders,
  selectedFolder,
  onFolderSelect,
  onCreateFolder,
  onDeleteFolder,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // const scroll = (direction: 'left' | 'right') => {
  //   if (scrollContainerRef.current) {
  //     const scrollAmount = 200;
  //     scrollContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  //   }
  // };

  return (
    <div className="navigation-container">
      {/* <button
        className="nav-button prev"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft size={16} />
      </button> */}
      <button className="button button-primary" onClick={onCreateFolder}>
          + Create Folder
      </button>
      <div className="nav-scroll-container" ref={scrollContainerRef}>
        
        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`button ${selectedFolder === folder.id ? 'button-primary' : ''}`}
            onClick={() => onFolderSelect(folder.id)}
          >
            {folder.name}
            {selectedFolder !== folder.id && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.id);
                }}
                className="ml-2"
              >
                ×
              </span>
            )}
          </button>
        ))}
      </div>

      {/* <button
        className="nav-button next"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight size={16} />
      </button> */}
    </div>
  );
};

export default NavigationBar;