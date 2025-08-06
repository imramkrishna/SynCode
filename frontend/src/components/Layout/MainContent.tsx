import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MonacoEditor from '../Editor/MonacoEditor';
import EditorTabs from '../Editor/EditorTabs';
import StatusBar from '../Editor/StatusBar';

const MainContent: React.FC = () => {
  const { tabs, activeTabId } = useSelector((state: RootState) => state.editor);
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {tabs.length > 0 ? (
        <>
          <EditorTabs />
          <div className="flex-1 relative">
            <MonacoEditor />
          </div>
          <StatusBar />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium mb-2">No files open</h3>
            <p className="text-sm">Open a file from the explorer to start editing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;