import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StatusBar: React.FC = () => {
  const { tabs, activeTabId } = useSelector((state: RootState) => state.editor);
  const { activeUsers } = useSelector((state: RootState) => state.collaboration);
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  return (
    <div className="h-6 bg-blue-600 text-white text-xs flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <span>Ready</span>
        {activeTab && (
          <>
            <span>•</span>
            <span>{activeTab.language.toUpperCase()}</span>
            <span>•</span>
            <span>UTF-8</span>
            <span>•</span>
            <span>LF</span>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <span>{activeUsers.length} user{activeUsers.length !== 1 ? 's' : ''} connected</span>
        <span>•</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
};

export default StatusBar;