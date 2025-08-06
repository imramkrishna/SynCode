import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Cursor, ChatMessage } from '../../utils/types';

interface CollaborationState {
  activeUsers: User[];
  userCursors: Cursor[];
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  isShareDialogOpen: boolean;
}

const initialState: CollaborationState = {
  activeUsers: [],
  userCursors: [],
  chatMessages: [],
  isChatOpen: false,
  isShareDialogOpen: false,
};

const collaborationSlice = createSlice({
  name: 'collaboration',
  initialState,
  reducers: {
    setActiveUsers: (state, action: PayloadAction<User[]>) => {
      state.activeUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      const existingUser = state.activeUsers.find(user => user.id === action.payload.id);
      if (!existingUser) {
        state.activeUsers.push(action.payload);
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.activeUsers = state.activeUsers.filter(user => user.id !== action.payload);
      state.userCursors = state.userCursors.filter(cursor => cursor.userId !== action.payload);
    },
    updateUserCursor: (state, action: PayloadAction<Cursor>) => {
      const existingCursorIndex = state.userCursors.findIndex(
        cursor => cursor.userId === action.payload.userId
      );
      if (existingCursorIndex !== -1) {
        state.userCursors[existingCursorIndex] = action.payload;
      } else {
        state.userCursors.push(action.payload);
      }
    },
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chatMessages.push(action.payload);
    },
    setChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.chatMessages = action.payload;
    },
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    setShareDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isShareDialogOpen = action.payload;
    },
  },
});

export const {
  setActiveUsers,
  addUser,
  removeUser,
  updateUserCursor,
  addChatMessage,
  setChatMessages,
  toggleChat,
  setShareDialogOpen,
} = collaborationSlice.actions;

export default collaborationSlice.reducer;