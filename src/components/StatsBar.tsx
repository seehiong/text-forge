import React from 'react';
import { FileText, Hash, BarChart3, Minus } from 'lucide-react';
import { TextStats } from '../types';

interface StatsBarProps {
  stats: TextStats;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const statItems = [
    { label: 'Words', value: stats.words, icon: FileText },
    { label: 'Characters', value: stats.characters, icon: Hash },
    { label: 'Lines', value: stats.lines, icon: BarChart3 },
    { label: 'Chars (no spaces)', value: stats.charactersNoSpaces, icon: Minus }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}:
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsBar;