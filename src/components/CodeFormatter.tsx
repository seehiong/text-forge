//src/components/CodeFormatter.tsx

import React, { useState } from 'react';
import { formatJSON, convertKvToJson, minifyCSS } from '../utils/formatters';
import { beautifyHTML, minifyHTML } from '../utils/htmlFormatter';
import ToolButton from './ToolButton';
import { Braces, Minimize2, ListPlus, FileCode, AlertCircle, Info, Code } from 'lucide-react';

interface CodeFormatterProps {
  input: string;
  onOutput: (output: string) => void;
}

const CodeFormatter: React.FC<CodeFormatterProps> = ({ input, onOutput }) => {
  const [error, setError] = useState<string>('');

  const handleFormat = async (action: string) => {
    setError('');
    try {
      let result = '';

      switch (action) {
        case 'jsonBeautify':
          result = formatJSON(input, true);
          break;
        case 'jsonMinify':
          result = formatJSON(input, false);
          break;
        case 'kvToJson':
          result = convertKvToJson(input);
          break;
        case 'cssMinify':
          result = minifyCSS(input);
          break;
        case 'htmlBeautify':
          result = beautifyHTML(input);
          break;
        case 'htmlMinify':
          result = minifyHTML(input);
          break;
        default:
          result = input;
      }

      onOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const tools = [
    {
      action: 'jsonBeautify',
      label: 'Beautify JSON',
      description: 'Format JSON with proper spacing and indentation',
      icon: <Braces className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'jsonMinify',
      label: 'Minify JSON',
      description: 'Compress JSON by removing all unnecessary spacing',
      icon: <Minimize2 className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'kvToJson',
      label: 'Key-Value to JSON',
      description: 'Transform standard key=value lines into a JSON object',
      icon: <ListPlus className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'cssMinify',
      label: 'Minify CSS',
      description: 'Optimize CSS by removing comments and spaces',
      icon: <FileCode className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'htmlBeautify',
      label: 'Beautify HTML',
      description: 'Format HTML with proper tag spacing and indentations',
      icon: <Code className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'htmlMinify',
      label: 'Minify HTML',
      description: 'Compress HTML documents by removing comments and spacing',
      icon: <Minimize2 className="w-4 h-4 text-indigo-500" />
    }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Code & Data Formatter</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Beautify, compress, and convert structured code and properties
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                onClick={() => handleFormat(tool.action)}
                disabled={!input.trim()}
                variant="primary"
                className="w-full text-xs"
              >
                Apply Formatter
              </ToolButton>
            </div>
          );
        })}
      </div>

      {/* Info Callout */}
      <div className="bg-indigo-50/60 dark:bg-[#120e24]/40 border border-indigo-100 dark:border-indigo-500/15 rounded-2xl p-4 flex items-start space-x-3 shadow-inner">
        <Info className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-2 w-full">
          <h3 className="font-bold text-indigo-950 dark:text-slate-200 text-xs">
            Key-Value Format Syntax
          </h3>
          <p className="text-[11px] text-indigo-800/85 dark:text-slate-400 leading-normal">
            To use Key-Value to JSON, input pairs separated by `=` or `:` on separate lines:
          </p>
          <div className="p-3 bg-indigo-100/40 dark:bg-black/35 rounded-xl border border-indigo-200/30 dark:border-white/5 font-mono text-[10px] text-indigo-900/90 dark:text-slate-400">
            name=John Doe<br />
            age=30<br />
            city=New York
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFormatter;