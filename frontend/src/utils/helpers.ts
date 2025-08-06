import { USER_COLORS, FILE_ICONS } from './constants';
import { FileNode } from './types';

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getRandomUserColor = (): string => {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
};

export const getFileIcon = (language?: string): string => {
  if (!language) return FILE_ICONS.default;
  return FILE_ICONS[language as keyof typeof FILE_ICONS] || FILE_ICONS.default;
};

export const getLanguageFromFilename = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const extensionMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'cpp',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'json': 'json',
    'md': 'markdown',
    'yml': 'yaml',
    'yaml': 'yaml',
  };

  return extensionMap[extension || ''] || 'plaintext';
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export const buildFileTree = (files: FileNode[]): FileNode[] => {
  const fileMap = new Map<string, FileNode>();
  const rootFiles: FileNode[] = [];

  // Create a map of all files
  files.forEach(file => {
    fileMap.set(file.id, { ...file, children: [] });
  });

  // Build the tree structure
  files.forEach(file => {
    const fileNode = fileMap.get(file.id)!;
    
    if (file.parentId) {
      const parent = fileMap.get(file.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(fileNode);
      }
    } else {
      rootFiles.push(fileNode);
    }
  });

  return rootFiles;
};

export const flattenFileTree = (nodes: FileNode[]): FileNode[] => {
  const result: FileNode[] = [];
  
  const traverse = (node: FileNode) => {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  nodes.forEach(traverse);
  return result;
};