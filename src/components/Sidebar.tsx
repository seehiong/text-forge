//src/components/Sidebar.tsx

import React from 'react';
import { ToolType } from '../types';
import {
  Sparkles,
  CaseSensitive,
  Braces,
  Binary,
  GitCompare,
  KeyRound,
  Clock,
  Search,
  Sun,
  Moon,
  Github,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { id: 'cleanup', name: 'Text Cleanup', description: 'Clean and analyze text' },
  { id: 'case', name: 'Case Converter', description: 'Convert text cases' },
  { id: 'format', name: 'Code Formatter', description: 'Format JSON, CSS & more' },
  { id: 'encoding', name: 'Encoding & Hash', description: 'Encode, decode & hash' },
  { id: 'diff', name: 'Diff Checker', description: 'Compare two texts side-by-side' },
  { id: 'generators', name: 'Generators', description: 'Generate UUIDs & passwords' },
  { id: 'time', name: 'Time Converter', description: 'Epoch timestamps & dates' },
  { id: 'regex', name: 'Regex Tester', description: 'Test regex match patterns' },
];

const getToolIcon = (id: string, className: string = "w-4 h-4") => {
  switch (id) {
    case 'cleanup':
      return <Sparkles className={className} />;
    case 'case':
      return <CaseSensitive className={className} />;
    case 'format':
      return <Braces className={className} />;
    case 'encoding':
      return <Binary className={className} />;
    case 'diff':
      return <GitCompare className={className} />;
    case 'generators':
      return <KeyRound className={className} />;
    case 'time':
      return <Clock className={className} />;
    case 'regex':
      return <Search className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({
  activeTool,
  onToolChange,
  isDark,
  onThemeToggle,
  isOpen,
  onClose
}) => {

  const renderContent = () => (
    <>
      {/* Brand Branding Logo */}
      <div className="flex items-center space-x-3 px-1 mb-8 shrink-0">
        <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-slate-800 dark:text-white text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              TextForge
            </span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10">
              v1.0
            </span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-tight">
            Manipulation Toolkit
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-none shrink-0 min-h-0">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                onToolChange(tool.id as ToolType);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group text-left ${isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.01]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/5'
                }`}
            >
              <span className={`transition-transform duration-300 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {getToolIcon(tool.id, "w-4.5 h-4.5")}
              </span>
              <div>
                <div className="leading-tight font-black">{tool.name}</div>
                <div className={`text-[10px] font-medium mt-0.5 transition-colors duration-200 ${isActive ? 'text-purple-200' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                  }`}>
                  {tool.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 space-y-2 shrink-0">
        <button
          onClick={onThemeToggle}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all duration-200"
        >
          <span className="flex items-center space-x-2.5">
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-purple-500" />}
            <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>

        <a
          href="https://github.com/seehiong/text-forge"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2.5 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300 transition-all duration-200"
        >
          <Github className="w-4 h-4 shrink-0" />
          <span>GitHub Repository</span>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-full bg-white/70 dark:bg-[#090714]/65 border-r border-slate-200/50 dark:border-white/5 p-6 backdrop-blur-xl shrink-0 z-40">
        {renderContent()}
      </aside>

      {/* Mobile Slider Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Back Overlay shadow */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          {/* Slider content */}
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#090714] border-r border-slate-200/50 dark:border-white/5 p-6 flex flex-col shadow-2xl relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
