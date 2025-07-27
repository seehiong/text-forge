import React, { useState } from 'react';
import { 
  encodeBase64, 
  decodeBase64, 
  encodeURL, 
  decodeURL, 
  generateSHA256 
} from '../utils/formatters';
import ToolButton from './ToolButton';

interface EncodingToolsProps {
  input: string;
  onOutput: (output: string) => void;
}

const EncodingTools: React.FC<EncodingToolsProps> = ({ input, onOutput }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEncoding = async (action: string) => {
    setError('');
    setLoading(true);
    
    try {
      let result = '';
      
      switch (action) {
        case 'base64Encode':
          result = encodeBase64(input);
          break;
        case 'base64Decode':
          result = decodeBase64(input);
          break;
        case 'urlEncode':
          result = encodeURL(input);
          break;
        case 'urlDecode':
          result = decodeURL(input);
          break;
        case 'sha256':
          result = await generateSHA256(input);
          break;
        default:
          result = input;
      }
      
      onOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    {
      action: 'base64Encode',
      label: 'Encode Base64',
      description: 'Convert text to Base64 encoding'
    },
    {
      action: 'base64Decode',
      label: 'Decode Base64',
      description: 'Convert Base64 back to text'
    },
    {
      action: 'urlEncode',
      label: 'URL Encode',
      description: 'Encode text for safe URL usage'
    },
    {
      action: 'urlDecode',
      label: 'URL Decode',
      description: 'Decode URL-encoded text'
    },
    {
      action: 'sha256',
      label: 'SHA-256 Hash',
      description: 'Generate SHA-256 hash (one-way)'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Encoding & Hashing Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Encode, decode, and hash text for various purposes
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                onClick={() => handleEncoding(tool.action)}
                disabled={!input.trim() || loading}
                variant="primary"
                className="w-full"
              >
                {loading && tool.action === 'sha256' ? 'Hashing...' : 'Apply'}
              </ToolButton>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
          Security Note
        </h3>
        <p className="text-xs text-amber-700 dark:text-amber-300">
          SHA-256 hashing is one-way and cannot be reversed. Base64 and URL encoding are not encryption methods.
        </p>
      </div>
    </div>
  );
};

export default EncodingTools;