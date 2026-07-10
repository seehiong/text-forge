//src/components/TextArea.tsx

import React, { useState } from 'react';
import { Copy, RotateCcw, Check, FileText } from 'lucide-react';
import { copyToClipboard } from '../utils/textUtils';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      const success = await copyToClipboard(value);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-[#0c0919]/60 overflow-hidden shadow-sm shadow-purple-950/5">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-[#120e24]/70 border-b border-slate-200/60 dark:border-white/5 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
            {label}
          </span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${readOnly
              ? 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
            }`}>
            {readOnly ? 'Output' : 'Input'}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          {onClear && (
            <button
              onClick={onClear}
              disabled={!value}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
              title="Clear input"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!value}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${copied
                ? 'bg-emerald-500 text-white'
                : 'bg-white dark:bg-[#1a1635] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-[#201c3e] disabled:opacity-40'
              }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`flex-1 w-full p-4 bg-white/50 dark:bg-[#0c0919]/35 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 resize-none font-mono text-sm leading-relaxed
                   focus:outline-none focus:ring-1 focus:ring-purple-500/50 dark:focus:ring-purple-400/30 focus:bg-white dark:focus:bg-[#0c0919]/55
                   min-h-0 transition-all duration-300
                   ${readOnly ? 'cursor-default select-all' : ''}`}
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default TextArea;