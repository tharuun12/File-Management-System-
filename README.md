📂 File Management System
A simple and intuitive file management system built using React, TypeScript, and CSS. This system allows users to create, organize, and manage folders and files efficiently.

🚀 Features
📁 Folder Management
Create Folders: Add main folders with a "+ Create Folder" button.
Delete Folders: Remove folders and all their contents easily.
Horizontal Navigation: Scrollable bar to view and switch between folders.
📂 Subfolder Management
Nested Folders: Create subfolders within main folders using a "+ Add Folder" button.
Inheritance: Subfolders inherit all features of main folders, including file management.
📄 File Management
Upload Files: Add files to main folders or subfolders with a "+ Add Document" button.
File States:
Pending (Yellow): Awaiting upload.
Completed (Green): Successfully uploaded.
File Actions:
Upload, Cancel, and Delete files.
Upload Progress: Visual feedback for ongoing uploads.
🛠️ Project Structure
lua
Copy
Edit
file-management-system/
└── src/
  ├── App.css
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  ├── vite-env.d.ts
  └── components/
      ├── FolderManagement/
      │   ├── FileManager.tsx
      │   ├── FolderManagement.css
      │   ├── MainFolder.tsx
      │   └── Subfolder.tsx
      └── Navigation/
          ├── Navigation.css
          └── NavigationBar.tsx
🛠️ Technologies Used
React with TypeScript for building components.
CSS for styling.
Vite for development and bundling.
📚 How to Use
Clone the repository:
bash
Copy
Edit
git clone https://github.com/your-username/file-management-system.git
cd file-management-system-
Install dependencies:
bash
Copy
Edit
npm install
Start the development server:
bash
Copy
Edit
npm run dev
Open the app in your browser at http://localhost:3000.
🛡️ Features in Action
Add and manage folders using the intuitive navigation bar.
Organize subfolders and manage files with upload, cancel, and delete functionalities.
Track upload progress visually for better control.
🤝 Contributing
Feel free to fork this repository and submit pull requests. Contributions are always welcome!
