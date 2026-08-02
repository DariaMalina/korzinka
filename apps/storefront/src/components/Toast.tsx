import { useEffect } from 'react';

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  return message ? (
    <div aria-live="polite" className="toast" role="status">
      <span aria-hidden="true">✓</span>
      {message}
      <button aria-label="Закрыть уведомление" onClick={onClose} type="button">
        ×
      </button>
    </div>
  ) : null;
}
