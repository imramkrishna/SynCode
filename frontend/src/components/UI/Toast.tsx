import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeToast } from '../../store/slices/uiSlice';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const colorMap = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white'
};

const ToastContainer: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.ui.toasts);

  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = iconMap[toast.type];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.3 }}
              className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${colorMap[toast.type]}`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() => dispatch(removeToast(toast.id))}
                className="ml-3 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;