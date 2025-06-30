import React from 'react';

interface BoltBadgeProps {
  className?: string;
  isDark?: boolean;
}

const BoltBadge: React.FC<BoltBadgeProps> = ({ className = '', isDark = false }) => {
  const badgeSrc = isDark 
    ? '/white_circle_360x360.png'
    : '/black_circle_360x360.png';

  const defaultClasses = "transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95";

  return (
    <a 
      href="https://bolt.new/" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${defaultClasses} ${className}`}
      title="Powered by Bolt.new"
    >
      <img 
        src={badgeSrc}
        alt="Powered by Bolt.new" 
        className="w-full h-full object-contain"
      />
    </a>
  );
};

export default BoltBadge;