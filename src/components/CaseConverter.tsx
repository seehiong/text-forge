import React from 'react';
import { convertCase } from '../utils/textUtils';
import ToolButton from './ToolButton';

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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Case Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Convert text between different case formats
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.type}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              {caseItem.label}
            </h3>
            
            <div className="mb-3 p-2 bg-white dark:bg-gray-900 rounded border">
              <code className="text-xs text-gray-600 dark:text-gray-400">
                {caseItem.preview}
              </code>
            </div>

            <ToolButton
              onClick={() => handleConversion(caseItem.type)}
              disabled={!input.trim()}
              variant="primary"
              className="w-full"
            >
              Convert
            </ToolButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseConverter;