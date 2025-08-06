import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { FileNode as FileNodeType } from '../../utils/types';
import { getFileIcon } from '../../utils/helpers';

interface FileNodeProps {
  node: FileNodeType;
  onFileClick: (node: FileNodeType) => void;
  level: number;
}

const FileNode: React.FC<FileNodeProps> = ({ node, onFileClick, level }) => {
  const [isExpanded, setIsExpanded] = useState(node.isOpen || false);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileClick(node);
    }
  };

  const paddingLeft = level * 12 + 8;

  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
        style={{ paddingLeft }}
      >
        {node.type === 'folder' && (
          <div className="w-4 h-4 mr-1 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-gray-500" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-500" />
            )}
          </div>
        )}
        
        <div className="w-4 h-4 mr-2 flex items-center justify-center">
          {node.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )
          ) : (
            <span className="text-sm">
              {getFileIcon(node.language)}
            </span>
          )}
        </div>
        
        <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
          {node.name}
        </span>
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map(child => (
            <FileNode
              key={child.id}
              node={child}
              onFileClick={onFileClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;