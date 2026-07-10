//src/components/ToolButton.tsx

import React from 'react';

interface ToolButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({
  onClick,
  children,
  variant = 'secondary',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-98';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/10 border border-purple-600/30 dark:border-purple-400/20',
    secondary: 'bg-white dark:bg-[#120e25]/60 hover:bg-slate-50 dark:hover:bg-[#16122d]/80 text-purple-600 dark:text-purple-400 border border-slate-200/80 dark:border-white/5 shadow-sm',
    danger: 'bg-red-500/10 dark:bg-red-500/5 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ToolButton;