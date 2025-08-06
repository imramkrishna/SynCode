import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTab, setActiveTab } from '../../store/slices/editorSlice';
import FileNode from './FileNode';
import CreateFileDialog from './CreateFileDialog';
import Button from '../UI/Button';
import { Plus, FolderPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const FileTree: React.FC = () => {
  const dispatch = useDispatch();
  const { fileTree, documents } = useSelector((state: RootState) => state.documents);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'folder'>('file');

  const handleFileClick = (fileNode: any) => {
    if (fileNode.type === 'file') {
      const document = documents.find(doc => doc.id === fileNode.id);
      if (document) {
        const tabId = uuidv4();
        const newTab = {
          id: tabId,
          documentId: document.id,
          name: document.name,
          language: document.language,
          isActive: true,
          isDirty: false,
        };
        
        dispatch(addTab(newTab));
        dispatch(setActiveTab(tabId));
      }
    }
  };

  const handleCreateFile = () => {
    setCreateType('file');
    setShowCreateDialog(true);
  };

  const handleCreateFolder = () => {
    setCreateType('folder');
    setShowCreateDialog(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Explorer
        </span>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={handleCreateFile}
            className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="New File"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={FolderPlus}
            onClick={handleCreateFolder}
            className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="New Folder"
          />
        </div>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-auto p-2">
        {fileTree.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm">No files yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateFile}
              className="mt-2"
            >
              Create your first file
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {fileTree.map(node => (
              <FileNode
                key={node.id}
                node={node}
                onFileClick={handleFileClick}
                level={0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <CreateFileDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        type={createType}
      />
    </div>
  );
};

export default FileTree;