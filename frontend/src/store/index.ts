import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import documentsSlice from './slices/documentsSlice';
import editorSlice from './slices/editorSlice';
import collaborationSlice from './slices/collaborationSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    documents: documentsSlice,
    editor: editorSlice,
    collaboration: collaborationSlice,
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;