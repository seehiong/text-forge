//src/components/TextCleanup.tsx

import React from 'react';
import { cleanupText } from '../utils/textUtils';
import ToolButton from './ToolButton';
import { Sparkles, CornerDownLeft, Minimize2, AlignLeft } from 'lucide-react';

interface TextCleanupProps {
  input: string;
  onOutput: (output: string) => void;
}

const TextCleanup: React.FC<TextCleanupProps> = ({ input, onOutput }) => {
  const handleCleanup = (action: string) => {
    const result = cleanupText(input, action);
    onOutput(result);
  };

  const tools = [
    {
      action: 'removeExtraSpaces',
      label: 'Remove Extra Spaces',
      description: 'Collapse multiple spaces into single spaces',
      icon: <Sparkles className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'removeLineBreaks',
      label: 'Remove Line Breaks',
      description: 'Convert text to a single line',
      icon: <CornerDownLeft className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'removeAllSpaces',
      label: 'Remove All Spaces',
      description: 'Remove all whitespace characters',
      icon: <Minimize2 className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'trimLines',
      label: 'Trim Each Line',
      description: 'Remove leading and trailing spaces from each line',
      icon: <AlignLeft className="w-4 h-4 text-indigo-500" />
    }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Text Cleanup Tools</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Clean up your text by removing unwanted whitespace and formatting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          return (
            <div
              key={tool.action}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-1.5 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {tool.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <ToolButton
                onClick={() => handleCleanup(tool.action)}
                disabled={!input.trim()}
                variant="primary"
                className="w-full text-xs"
              >
                Apply Cleanup
              </ToolButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextCleanup;