//src/components/CaseConverter.tsx

import React from 'react';
import { convertCase } from '../utils/textUtils';
import ToolButton from './ToolButton';
import { CaseSensitive } from 'lucide-react';

interface CaseConverterProps {
  input: string;
  onOutput: (output: string) => void;
}

const CaseConverter: React.FC<CaseConverterProps> = ({ input, onOutput }) => {
  const handleConversion = (caseType: string) => {
    const result = convertCase(input, caseType);
    onOutput(result);
  };

  const cases = [
    { type: 'uppercase', label: 'UPPERCASE', preview: 'HELLO WORLD' },
    { type: 'lowercase', label: 'lowercase', preview: 'hello world' },
    { type: 'sentence', label: 'Sentence case', preview: 'Hello world' },
    { type: 'title', label: 'Title Case', preview: 'Hello World' },
    { type: 'camelCase', label: 'camelCase', preview: 'helloWorld' },
    { type: 'pascalCase', label: 'PascalCase', preview: 'HelloWorld' },
    { type: 'snake_case', label: 'snake_case', preview: 'hello_world' },
    { type: 'kebab-case', label: 'kebab-case', preview: 'hello-world' },
    { type: 'CONSTANT_CASE', label: 'CONSTANT_CASE', preview: 'HELLO_WORLD' }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Case Converter</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Convert text between different case formats instantly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.type}
            className="glass-card p-5 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <CaseSensitive className="w-4 h-4 text-purple-500" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {caseItem.label}
                </h3>
              </div>

              <div className="mb-4 px-3 py-2 bg-slate-900/5 dark:bg-black/20 rounded-xl border border-slate-200/50 dark:border-white/5 font-mono text-xs flex items-center justify-between">
                <code className="text-slate-600 dark:text-slate-400 text-[11px] font-bold">
                  {caseItem.preview}
                </code>
                <span className="text-[8px] text-slate-400 dark:text-slate-600 font-bold uppercase select-none tracking-wider">Preview</span>
              </div>
            </div>

            <ToolButton
              onClick={() => handleConversion(caseItem.type)}
              disabled={!input.trim()}
              variant="primary"
              className="w-full text-xs"
            >
              Convert Case
            </ToolButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseConverter;