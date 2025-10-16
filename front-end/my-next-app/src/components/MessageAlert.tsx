interface MessageAlertProps {
  message: { type: 'success' | 'error'; text: string } | null;
}

export function MessageAlert({ message }: MessageAlertProps) {
  if (!message) return null;

  const alertClasses = {
    success: 'bg-green-500/20 border-green-500 text-green-400',
    error: 'bg-red-500/20 border-red-500 text-red-400'
  };

  return (
    <div className={`p-4 rounded-lg border ${alertClasses[message.type]}`}>
      {message.text}
    </div>
  );
}