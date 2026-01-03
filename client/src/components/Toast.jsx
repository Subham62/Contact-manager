import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-lg border-2 shadow-xl animate-slide-in ${styles[type]}`}>
      <p className="font-medium m-0">{message}</p>
    </div>
  );
};

export default Toast;
