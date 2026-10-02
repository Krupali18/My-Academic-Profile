import toast from 'react-hot-toast';

/**
 * Toast notifications configured to match site styling tokens
 */
export const notify = {
  success: (message: string) =>
    toast.success(message, {
      style: {
        background: '#0c223f',
        color: '#f8fafc',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
      },
    }),
  error: (message: string) =>
    toast.error(message, {
      style: {
        background: '#450a0a',
        color: '#fef2f2',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        fontSize: '14px',
      },
    }),
  loading: (message: string) =>
    toast.loading(message, {
      style: {
        background: '#0c223f',
        color: '#f8fafc',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
      },
    }),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};
