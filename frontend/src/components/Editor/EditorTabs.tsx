import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setActiveTab, removeTab } from '../../store/slices/editorSlice';
import { getFileIcon } from '../../utils/helpers';
import { X } from 'lucide-react';

const EditorTabs: React.FC = () => {
  const dispatch = useDispatch();
  const { tabs, activeTabId } = useSelector((state: RootState) => state.editor);

  const handleTabClick = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    dispatch(removeTab(tabId));
  };

  return (
    <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center px-3 py-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer
              min-w-0 max-w-xs group transition-colors
              ${tab.id === activeTabId 
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' 
                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className="text-sm mr-2">
              {getFileIcon(tab.language)}
            </span>
            
            <span className="text-sm truncate flex-1 min-w-0">
              {tab.name}
            </span>
            
            {tab.isDirty && (
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0" />
            )}
            
            <button
              onClick={(e) => handleCloseTab(e, tab.id)}
              className="ml-2 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorTabs;