import React from 'react';
import { Toast } from '../../types';
import { ToastItem } from './ToastItem';

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-full pointer-events-none px-3 sm:px-0 w-full sm:w-auto items-center sm:items-end"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
