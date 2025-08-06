import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleFileExplorer } from '../../store/slices/uiSlice';
import { toggleChat } from '../../store/slices/collaborationSlice';
import FileExplorer from '../FileExplorer';
import Button from '../UI/Button';
import { Files, MessageSquare, Users, Search } from 'lucide-react';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarWidth, isSidebarCollapsed, isFileExplorerOpen } = useSelector((state: RootState) => state.ui);
  const { isChatOpen } = useSelector((state: RootState) => state.collaboration);

  if (isSidebarCollapsed) {
    return (
      <div className="w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-2 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Files}
          onClick={() => dispatch(toggleFileExplorer())}
          className={`w-8 h-8 p-0 ${isFileExplorerOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
        />
        <Button
          variant="ghost"
          size="sm"
          icon={MessageSquare}
          onClick={() => dispatch(toggleChat())}
          className={`w-8 h-8 p-0 ${isChatOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Users}
          className="w-8 h-8 p-0 text-gray-600 dark:text-gray-300"
        />
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
      style={{ width: sidebarWidth }}
    >
      {/* Sidebar Header */}
      <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-3">
        <div className="flex space-x-1 w-full">
          <Button
            variant="ghost"
            size="sm"
            icon={Files}
            onClick={() => dispatch(toggleFileExplorer())}
            className={`flex-1 justify-start ${isFileExplorerOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Explorer
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={MessageSquare}
            onClick={() => dispatch(toggleChat())}
            className={`flex-1 justify-start ${isChatOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Chat
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isFileExplorerOpen && !isChatOpen && (
          <div className="h-full">
            <FileExplorer />
          </div>
        )}
        
        {isChatOpen && !isFileExplorerOpen && (
          <div className="h-full p-3">
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <MessageSquare className="w-8 h-8 mx-auto mb-2" />
              <p>Chat will be implemented here</p>
            </div>
          </div>
        )}

        {isFileExplorerOpen && isChatOpen && (
          <div className="h-full flex flex-col">
            <div className="flex-1 border-b border-gray-200 dark:border-gray-700">
              <FileExplorer />
            </div>
            <div className="flex-1 p-3">
              <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Chat</p>
              </div>
            </div>
          </div>
        )}

        {!isFileExplorerOpen && !isChatOpen && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2" />
              <p>Select a panel to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;