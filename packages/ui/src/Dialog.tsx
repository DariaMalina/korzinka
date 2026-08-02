import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

export type DialogProps = {
  children: ReactNode;
  className?: string;
  label: string;
  onClose: () => void;
  open: boolean;
};

export function Dialog({
  children,
  className = '',
  label,
  onClose,
  open,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      className={`ui-dialog ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
}
