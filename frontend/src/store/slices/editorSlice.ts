import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditorTab } from '../../utils/types';

interface EditorState {
  tabs: EditorTab[];
  activeTabId: string | null;
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

const initialState: EditorState = {
  tabs: [],
  activeTabId: null,
  theme: 'dark',
  fontSize: 14,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<EditorTab>) => {
      const existingTab = state.tabs.find(tab => tab.documentId === action.payload.documentId);
      if (!existingTab) {
        state.tabs.push(action.payload);
      }
      state.activeTabId = action.payload.id;
    },
    removeTab: (state, action: PayloadAction<string>) => {
      const tabIndex = state.tabs.findIndex(tab => tab.id === action.payload);
      if (tabIndex !== -1) {
        state.tabs.splice(tabIndex, 1);
        if (state.activeTabId === action.payload) {
          state.activeTabId = state.tabs.length > 0 ? state.tabs[0].id : null;
        }
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    updateTab: (state, action: PayloadAction<{ id: string; updates: Partial<EditorTab> }>) => {
      const tab = state.tabs.find(tab => tab.id === action.payload.id);
      if (tab) {
        Object.assign(tab, action.payload.updates);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'high-contrast'>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    toggleWordWrap: (state) => {
      state.wordWrap = !state.wordWrap;
    },
    toggleMinimap: (state) => {
      state.minimap = !state.minimap;
    },
    toggleLineNumbers: (state) => {
      state.lineNumbers = !state.lineNumbers;
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  updateTab,
  setTheme,
  setFontSize,
  toggleWordWrap,
  toggleMinimap,
  toggleLineNumbers,
} = editorSlice.actions;

export default editorSlice.reducer;