import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarWidth: number;
  isSidebarCollapsed: boolean;
  isFileExplorerOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toasts: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }>;
}

const initialState: UIState = {
  sidebarWidth: 250,
  isSidebarCollapsed: false,
  isFileExplorerOpen: true,
  theme: 'dark',
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = Math.max(200, Math.min(500, action.payload));
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    toggleFileExplorer: (state) => {
      state.isFileExplorerOpen = !state.isFileExplorerOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    addToast: (state, action: PayloadAction<{
      id: string;
      message: string;
      type: 'success' | 'error' | 'warning' | 'info';
      duration?: number;
    }>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const {
  setSidebarWidth,
  toggleSidebar,
  toggleFileExplorer,
  setTheme,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;