import React from 'react';
import { Trash2, Scissors, AlignLeft, Minus } from 'lucide-react';
import { cleanupText } from '../utils/textUtils';
import ToolButton from './ToolButton';

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
      icon: Minus,
      description: 'Collapse multiple spaces into single spaces'
    },
    {
      action: 'removeLineBreaks',
      label: 'Remove Line Breaks',
      icon: AlignLeft,
      description: 'Convert text to single line'
    },
    {
      action: 'removeAllSpaces',
      label: 'Remove All Spaces',
      icon: Scissors,
      description: 'Remove all whitespace characters'
    },
    {
      action: 'trimLines',
      label: 'Trim Each Line',
      icon: Trash2,
      description: 'Remove leading/trailing spaces from each line'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Text Cleanup Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Clean up your text by removing unwanted whitespace and formatting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.action}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {tool.label}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {tool.description}
                  </p>
                  <ToolButton
                    onClick={() => handleCleanup(tool.action)}
                    disabled={!input.trim()}
                    variant="primary"
                    className="w-full"
                  >
                    Apply
                  </ToolButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextCleanup;