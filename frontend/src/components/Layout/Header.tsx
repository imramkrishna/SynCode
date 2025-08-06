import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar, setTheme } from '../../store/slices/uiSlice';
import { setShareDialogOpen } from '../../store/slices/collaborationSlice';
import { logout } from '../../store/slices/authSlice';
import Button from '../UI/Button';
import {
  Menu,
  Share,
  Sun,
  Moon,
  Users,
  Settings,
  LogOut,
  Code2
} from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.ui);
  const { activeUsers } = useSelector((state: RootState) => state.collaboration);

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleShare = () => {
    dispatch(setShareDialogOpen(true));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          icon={Menu}
          onClick={() => dispatch(toggleSidebar())}
          className="text-gray-600 dark:text-gray-300"
        />

        <div className="flex items-center space-x-2">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-gray-900 dark:text-white">
            SynCode
          </span>
        </div>
      </div>

      {/* Center - Active users */}
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4 text-gray-500" />
        <div className="flex -space-x-2">
          {activeUsers.slice(0, 5).map((user, index) => (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: user.color, zIndex: 5 - index }}
              title={user.name}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          ))}
          {activeUsers.length > 5 && (
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-500 flex items-center justify-center text-white text-xs font-medium">
              +{activeUsers.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Share}
          onClick={handleShare}
          className="text-gray-600 dark:text-gray-300"
        />

        <Button
          variant="ghost"
          size="sm"
          icon={theme === 'light' ? Moon : Sun}
          onClick={handleThemeToggle}
          className="text-gray-600 dark:text-gray-300"
        />

        {user && (
          <div className="flex items-center space-x-2 ml-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;