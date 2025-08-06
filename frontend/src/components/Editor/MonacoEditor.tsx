import React, { useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MonacoEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const { tabs, activeTabId, theme, fontSize, wordWrap, minimap, lineNumbers } = useSelector((state: RootState) => state.editor);
  const { documents } = useSelector((state: RootState) => state.documents);
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const activeDocument = activeTab ? documents.find(doc => doc.id === activeTab.documentId) : null;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize,
      wordWrap: wordWrap ? 'on' : 'off',
      minimap: { enabled: minimap },
      lineNumbers: lineNumbers ? 'on' : 'off',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: false,
    });

    // Setup collaboration cursors
    setupCollaborationCursors(editor, monaco);
  };

  const setupCollaborationCursors = (editor: any, monaco: any) => {
    // This will be implemented with real-time cursor tracking
    // For now, we'll just set up the foundation
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!activeTab || !value) return;
    
    // This will dispatch document updates and operational transforms
    console.log('Editor content changed:', value);
  };

  if (!activeTab || !activeDocument) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📄</div>
          <p>Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Editor
        height="100%"
        language={activeTab.language}
        value={activeDocument.content}
        theme={theme === 'light' ? 'light' : 'vs-dark'}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize,
          wordWrap: wordWrap ? 'on' : 'off',
          minimap: { enabled: minimap },
          lineNumbers: lineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          renderWhitespace: 'boundary',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          mouseWheelScrollSensitivity: 1,
          fastScrollSensitivity: 5,
        }}
      />
    </div>
  );
};

export default MonacoEditor;