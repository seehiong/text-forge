//src/components/StatsBar.tsx

import React from 'react';
import { TextStats } from '../types';

interface StatsBarProps {
  stats: TextStats;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const statItems = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Lines', value: stats.lines },
    { label: 'Chars (no spaces)', value: stats.charactersNoSpaces }
  ];

  return (
    <footer className="bg-white/60 dark:bg-[#07050e]/40 border-t border-slate-200/50 dark:border-white/5 px-6 py-2.5 flex-shrink-0 backdrop-blur-md relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-start gap-3">
        {statItems.map((item) => {
          return (
            <div
              key={item.label}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100/50 dark:bg-[#120e25]/50 border border-slate-200/40 dark:border-white/5 rounded-xl shadow-sm"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              <span className="text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-500/5 dark:bg-purple-400/5 px-1.5 py-0.5 rounded-lg border border-purple-500/10 dark:border-purple-400/10">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default StatsBar;