import { ReactNode } from 'react';

interface ModalActionsProps {
  onCancel: () => void;
  submitText: string;
  loading: boolean;
  submitIcon?: ReactNode;
}

export function ModalActions({ 
  onCancel, 
  submitText, 
  loading, 
  submitIcon 
}: ModalActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/20 rounded-lg"
      >
        انصراف
      </button>
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 space-x-reverse"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>در حال ثبت...</span>
          </>
        ) : (
          <>
            {submitIcon}
            <span>{submitText}</span>
          </>
        )}
      </button>
    </div>
  );
}