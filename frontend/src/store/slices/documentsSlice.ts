import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document, FileNode } from '../../utils/types';

interface DocumentsState {
  documents: Document[];
  fileTree: FileNode[];
  activeDocumentId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  documents: [],
  fileTree: [],
  activeDocumentId: null,
  isLoading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action: PayloadAction<{ id: string; updates: Partial<Document> }>) => {
      const document = state.documents.find(doc => doc.id === action.payload.id);
      if (document) {
        Object.assign(document, action.payload.updates);
      }
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
    setFileTree: (state, action: PayloadAction<FileNode[]>) => {
      state.fileTree = action.payload;
    },
    addFileNode: (state, action: PayloadAction<FileNode>) => {
      state.fileTree.push(action.payload);
    },
    updateFileNode: (state, action: PayloadAction<{ id: string; updates: Partial<FileNode> }>) => {
      const updateNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === action.payload.id) {
            return { ...node, ...action.payload.updates };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      state.fileTree = updateNode(state.fileTree);
    },
    removeFileNode: (state, action: PayloadAction<string>) => {
      const removeNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter(node => {
          if (node.id === action.payload) return false;
          if (node.children) {
            node.children = removeNode(node.children);
          }
          return true;
        });
      };
      state.fileTree = removeNode(state.fileTree);
    },
    setActiveDocument: (state, action: PayloadAction<string | null>) => {
      state.activeDocumentId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDocuments,
  addDocument,
  updateDocument,
  removeDocument,
  setFileTree,
  addFileNode,
  updateFileNode,
  removeFileNode,
  setActiveDocument,
  setLoading,
  setError,
} = documentsSlice.actions;

export default documentsSlice.reducer;