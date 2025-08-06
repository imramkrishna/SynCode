import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { addDocument } from '../../store/slices/documentsSlice';
import { addFileNode } from '../../store/slices/documentsSlice';
import { getLanguageFromFilename } from '../../utils/helpers';
import { v4 as uuidv4 } from 'uuid';

interface CreateFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'file' | 'folder';
  parentId?: string;
}

const CreateFileDialog: React.FC<CreateFileDialogProps> = ({
  isOpen,
  onClose,
  type,
  parentId
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const id = uuidv4();
    const cleanName = name.trim();

    if (type === 'file') {
      const language = getLanguageFromFilename(cleanName);
      
      // Create document
      const document = {
        id,
        name: cleanName,
        content: '',
        language,
        ownerId: 'current-user', // This should come from auth state
        collaborators: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch(addDocument(document));
    }

    // Create file node
    const fileNode = {
      id,
      name: cleanName,
      type,
      path: parentId ? `parent/${cleanName}` : cleanName,
      parentId,
      language: type === 'file' ? getLanguageFromFilename(cleanName) : undefined,
    };
    
    dispatch(addFileNode(fileNode));

    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create New ${type === 'file' ? 'File' : 'Folder'}`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'file' ? 'File' : 'Folder'} Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={type === 'file' ? 'example.js' : 'folder-name'}
            autoFocus
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!name.trim()}
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateFileDialog;