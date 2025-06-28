import React from 'react';
import { 
  Scissors, 
  Type, 
  Code, 
  Lock, 
  Zap, 
  Moon, 
  Sun,
  Github
} from 'lucide-react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const tools = [
  { id: 'cleanup', name: 'Text Cleanup', icon: Scissors, description: 'Clean and analyze text' },
  { id: 'case', name: 'Case Converter', icon: Type, description: 'Convert text cases' },
  { id: 'format', name: 'Code Formatter', icon: Code, description: 'Format JSON, CSS & more' },
  { id: 'encoding', name: 'Encoding & Hash', icon: Lock, description: 'Encode, decode & hash' },
  { id: 'generators', name: 'Generators', icon: Zap, description: 'Generate UUIDs & passwords' },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTool, 
  onToolChange, 
  isDark, 
  onThemeToggle 
}) => {
  return (
    <div className="w-16 lg:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            TextForge
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Text & Data Toolkit
          </p>
        </div>
        <div className="lg:hidden flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="flex-1 py-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id as ToolType)}
              className={`w-full p-3 lg:p-4 flex items-center lg:text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-r-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              title={tool.name}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600 dark:text-purple-400' : ''}`} />
              <div className="hidden lg:block ml-3">
                <div className="font-medium text-sm">{tool.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">{tool.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={onThemeToggle}
          className="w-full p-2 rounded-lg flex items-center justify-center lg:justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="hidden lg:block ml-3 text-sm">
            {isDark ? 'Light' : 'Dark'} Mode
          </span>
        </button>
        
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-2 rounded-lg flex items-center justify-center lg:justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="View on GitHub"
        >
          <Github className="w-5 h-5" />
          <span className="hidden lg:block ml-3 text-sm">GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;