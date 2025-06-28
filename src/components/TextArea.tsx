import React from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '../utils/textUtils';
import ToolButton from './ToolButton';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  readOnly?: boolean;
  onClear?: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  readOnly = false,
  onClear
}) => {
  const handleCopy = async () => {
    if (value) {
      const success = await copyToClipboard(value);
      if (success) {
        // Could add a toast notification here
      }
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="flex space-x-2">
          {onClear && (
            <ToolButton
              onClick={onClear}
              variant="secondary"
              disabled={!value}
              className="text-xs px-3 py-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear
            </ToolButton>
          )}
          <ToolButton
            onClick={handleCopy}
            variant="secondary"
            disabled={!value}
            className="text-xs px-3 py-1"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </ToolButton>
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`flex-1 w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   placeholder-gray-500 dark:placeholder-gray-400 resize-none
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   min-h-0
                   ${readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default TextArea;