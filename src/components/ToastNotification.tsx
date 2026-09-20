import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  onClose,
  onOpenCart,
}) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-[#1B4332] text-white p-4 rounded-2xl shadow-2xl border border-[#3A6B53] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
      id="toast-notification"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#2D6A4F] text-[#74C69D] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <p className="text-xs font-semibold leading-snug truncate">
          {message}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {onOpenCart && (
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="px-2.5 py-1 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
          >
            View Cart
          </button>
        )}
        <button
          onClick={onClose}
          aria-label="Dismiss toast"
          className="p-1 text-[#A4C4B1] hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
