import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setDocuments, setFileTree } from '../store/slices/documentsSlice';
import { addUser } from '../store/slices/collaborationSlice';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import MainContent from '../components/Layout/MainContent';
import ToastContainer from '../components/UI/Toast';
import { getRandomUserColor, generateUserId } from '../utils/helpers';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Initialize with sample data
    const sampleDocuments = [
      {
        id: '1',
        name: 'app.js',
        content: `// Welcome to SynCode!
// This is a real-time collaborative code editor

function hello() {
  console.log('Hello, World!');
  return 'Welcome to collaborative coding!';
}

hello();`,
        language: 'javascript',
        ownerId: 'user1',
        collaborators: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'README.md',
        content: `# SynCode

A real-time collaborative code editor built with React and Monaco Editor.

## Features

- 🚀 Real-time collaboration
- 📝 Monaco Editor integration
- 🎨 Multiple themes
- 📁 File explorer
- 💬 Live chat
- 👥 User presence

## Getting Started

1. Create or open a file
2. Start typing to see real-time collaboration
3. Share your session with others
4. Enjoy coding together!`,
        language: 'markdown',
        ownerId: 'user1',
        collaborators: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    const sampleFileTree = [
      {
        id: '1',
        name: 'app.js',
        type: 'file' as const,
        path: 'app.js',
        language: 'javascript',
      },
      {
        id: '2',
        name: 'README.md',
        type: 'file' as const,
        path: 'README.md',
        language: 'markdown',
      },
      {
        id: '3',
        name: 'src',
        type: 'folder' as const,
        path: 'src',
        children: [],
      }
    ];

    dispatch(setDocuments(sampleDocuments));
    dispatch(setFileTree(sampleFileTree));

    // Add some demo users for collaboration
    const demoUsers = [
      {
        id: generateUserId(),
        name: 'Alice',
        email: 'alice@example.com',
        color: getRandomUserColor(),
        isOnline: true,
      },
      {
        id: generateUserId(),
        name: 'Bob',
        email: 'bob@example.com',
        color: getRandomUserColor(),
        isOnline: true,
      }
    ];

    demoUsers.forEach(user => dispatch(addUser(user)));
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Editor;