import React, { useState } from 'react';
import { formatJSON, convertKvToJson, minifyCSS } from '../utils/formatters';
import ToolButton from './ToolButton';

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
      description: 'Format JSON with proper indentation'
    },
    {
      action: 'jsonMinify',
      label: 'Minify JSON',
      description: 'Remove whitespace from JSON'
    },
    {
      action: 'kvToJson',
      label: 'Key-Value to JSON',
      description: 'Convert key=value pairs to JSON object'
    },
    {
      action: 'cssMinify',
      label: 'Minify CSS',
      description: 'Remove comments and whitespace from CSS'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Code & Data Formatter
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Format, minify, and convert code and data structures
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          return (
            <div
              key={tool.action}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                {tool.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {tool.description}
              </p>
              <ToolButton
                onClick={() => handleFormat(tool.action)}
                disabled={!input.trim()}
                variant="primary"
                className="w-full"
              >
                Apply
              </ToolButton>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Key-Value Format Example
        </h3>
        <code className="text-xs text-blue-700 dark:text-blue-300 block">
          name=John Doe<br/>
          age=30<br/>
          city=New York
        </code>
      </div>
    </div>
  );
};

export default CodeFormatter;