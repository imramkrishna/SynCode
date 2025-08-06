export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color: string;
  isOnline: boolean;
}

export interface Document {
  id: string;
  name: string;
  content: string;
  language: string;
  ownerId: string;
  collaborators: User[];
  createdAt: string;
  updatedAt: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  parentId?: string;
  children?: FileNode[];
  language?: string;
  isOpen?: boolean;
}

export interface Cursor {
  userId: string;
  position: {
    lineNumber: number;
    column: number;
  };
  selection?: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  };
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
}

export interface Operation {
  type: 'insert' | 'delete' | 'retain';
  position: number;
  content?: string;
  length?: number;
  userId: string;
  timestamp: string;
}

export interface EditorTab {
  id: string;
  documentId: string;
  name: string;
  language: string;
  isActive: boolean;
  isDirty: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}