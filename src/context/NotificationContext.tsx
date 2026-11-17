import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  Toast,
  ToastType,
  ConfirmationDialogOptions,
  AlertDialogOptions,
  DialogVariant
} from '../types';
import { ToastContainer } from '../components/common/ToastContainer';
import { ConfirmationModal } from '../components/common/ConfirmationModal';

interface NotifyOptions {
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  thumbnail?: string;
}

interface NotificationContextType {
  toasts: Toast[];
  notify: {
    (options: NotifyOptions): string;
    success: (title: string, message?: string, extra?: Partial<NotifyOptions>) => string;
    error: (title: string, message?: string, extra?: Partial<NotifyOptions>) => string;
    warning: (title: string, message?: string, extra?: Partial<NotifyOptions>) => string;
    info: (title: string, message?: string, extra?: Partial<NotifyOptions>) => string;
    royal: (title: string, message?: string, extra?: Partial<NotifyOptions>) => string;
  };
  dismissToast: (id: string) => void;
  confirm: (options: Omit<ConfirmationDialogOptions, 'onConfirm'> & { onConfirm?: () => void | Promise<void> }) => Promise<boolean>;
  alert: (options: AlertDialogOptions) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert';
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: DialogVariant;
    resolve?: (value: any) => void;
  }>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: ''
  });

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((options: NotifyOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: Toast = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? 4200,
      action: options.action,
      thumbnail: options.thumbnail
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 5)); // Keep max 5 toasts on screen
    return id;
  }, []);

  const notifyFn = useCallback(
    Object.assign(
      (options: NotifyOptions) => addToast(options),
      {
        success: (title: string, message?: string, extra?: Partial<NotifyOptions>) =>
          addToast({ type: 'success', title, message, ...extra }),
        error: (title: string, message?: string, extra?: Partial<NotifyOptions>) =>
          addToast({ type: 'error', title, message, duration: 6000, ...extra }),
        warning: (title: string, message?: string, extra?: Partial<NotifyOptions>) =>
          addToast({ type: 'warning', title, message, ...extra }),
        info: (title: string, message?: string, extra?: Partial<NotifyOptions>) =>
          addToast({ type: 'info', title, message, ...extra }),
        royal: (title: string, message?: string, extra?: Partial<NotifyOptions>) =>
          addToast({ type: 'royal', title, message, duration: 5000, ...extra })
      }
    ),
    [addToast]
  );

  const confirm = useCallback(
    (options: Omit<ConfirmationDialogOptions, 'onConfirm'> & { onConfirm?: () => void | Promise<void> }): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setDialogState({
          isOpen: true,
          type: 'confirm',
          title: options.title,
          message: options.message,
          confirmText: options.confirmText || 'Confirm',
          cancelText: options.cancelText || 'Cancel',
          variant: options.variant || 'danger',
          resolve: async (agreed: boolean) => {
            if (agreed && options.onConfirm) {
              await options.onConfirm();
            }
            resolve(agreed);
          }
        });
      });
    },
    []
  );

  const alert = useCallback(
    (options: AlertDialogOptions): Promise<void> => {
      return new Promise<void>((resolve) => {
        setDialogState({
          isOpen: true,
          type: 'alert',
          title: options.title,
          message: options.message,
          confirmText: options.buttonText || 'Understood',
          variant: options.variant || 'info',
          resolve: () => {
            if (options.onClose) options.onClose();
            resolve();
          }
        });
      });
    },
    []
  );

  const handleModalConfirm = async () => {
    if (dialogState.resolve) {
      await dialogState.resolve(true);
    }
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleModalCancel = () => {
    if (dialogState.resolve) {
      dialogState.resolve(false);
    }
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notify: notifyFn,
        dismissToast,
        confirm,
        alert
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {dialogState.isOpen && (
        <ConfirmationModal
          type={dialogState.type}
          title={dialogState.title}
          message={dialogState.message}
          confirmText={dialogState.confirmText}
          cancelText={dialogState.cancelText}
          variant={dialogState.variant}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
