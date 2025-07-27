import React from 'react';
import { ToolType } from '../types';

interface TabNavigationProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools = [
  { id: 'cleanup', name: 'Text Cleanup', description: 'Clean and analyze text' },
  { id: 'case', name: 'Case Converter', description: 'Convert text cases' },
  { id: 'format', name: 'Code Formatter', description: 'Format JSON, CSS & more' },
  { id: 'encoding', name: 'Encoding & Hash', description: 'Encode, decode & hash' },
  { id: 'generators', name: 'Generators', description: 'Generate UUIDs & passwords' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex-shrink-0">
      <div className="flex overflow-x-auto">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id as ToolType)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{tool.name}</div>
                <div className="text-xs opacity-75 mt-1">{tool.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;