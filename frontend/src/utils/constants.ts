export const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: '.js' },
  { id: 'typescript', name: 'TypeScript', extension: '.ts' },
  { id: 'python', name: 'Python', extension: '.py' },
  { id: 'java', name: 'Java', extension: '.java' },
  { id: 'cpp', name: 'C++', extension: '.cpp' },
  { id: 'html', name: 'HTML', extension: '.html' },
  { id: 'css', name: 'CSS', extension: '.css' },
  { id: 'json', name: 'JSON', extension: '.json' },
  { id: 'markdown', name: 'Markdown', extension: '.md' },
  { id: 'yaml', name: 'YAML', extension: '.yml' },
];

export const USER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const EDITOR_THEMES = {
  LIGHT: 'light',
  DARK: 'vs-dark',
  HIGH_CONTRAST: 'hc-black'
};

export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_DOCUMENT: 'join_document',
  LEAVE_DOCUMENT: 'leave_document',
  OPERATION: 'operation',
  CURSOR_MOVE: 'cursor_move',
  CHAT_MESSAGE: 'chat_message',
  USER_JOIN: 'user_join',
  USER_LEAVE: 'user_leave',
};

export const FILE_ICONS = {
  javascript: '📄',
  typescript: '📘',
  python: '🐍',
  java: '☕',
  cpp: '⚡',
  html: '🌐',
  css: '🎨',
  json: '📋',
  markdown: '📝',
  folder: '📁',
  default: '📄'
};