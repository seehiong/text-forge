//src/components/EncodingTools.tsx

import React, { useState } from 'react';
import {
  encodeBase64,
  decodeBase64,
  encodeURL,
  decodeURL,
  generateSHA256,
  decodeJWT,
  parseURL
} from '../utils/encoding';
import ToolButton from './ToolButton';
import {
  Binary,
  FileText,
  Globe,
  Link2,
  Fingerprint,
  AlertTriangle,
  AlertCircle,
  KeyRound,
  Compass
} from 'lucide-react';

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
        case 'jwtDecode':
          const decoded = decodeJWT(input);
          result = `// HEADER\n${JSON.stringify(decoded.header, null, 2)}\n\n// PAYLOAD\n${JSON.stringify(decoded.payload, null, 2)}`;
          break;
        case 'urlParse':
          const parsed = parseURL(input);
          result = `Protocol:   ${parsed.protocol}\nHost:       ${parsed.host}\nPath:       ${parsed.pathname}\n\nQuery Parameters:\n` +
            (parsed.queryParams.length === 0
              ? '(None)'
              : parsed.queryParams.map(p => `  ${p.key} = ${p.value}`).join('\n')
            );
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
      description: 'Convert plain text data to Base64 format encoding',
      icon: <Binary className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'base64Decode',
      label: 'Decode Base64',
      description: 'Convert Base64 formatted string back to text',
      icon: <FileText className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'urlEncode',
      label: 'URL Encode',
      description: 'Encode text strings for safe transmission in URLs',
      icon: <Globe className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'urlDecode',
      label: 'URL Decode',
      description: 'Convert URL-encoded strings back to normal text',
      icon: <Link2 className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'jwtDecode',
      label: 'JWT Decoder',
      description: 'Decode JWT payload and header JSON strings locally',
      icon: <KeyRound className="w-4 h-4 text-purple-500" />
    },
    {
      action: 'urlParse',
      label: 'URL Parser',
      description: 'Break down URL protocol, paths, and query variables',
      icon: <Compass className="w-4 h-4 text-indigo-500" />
    },
    {
      action: 'sha256',
      label: 'SHA-256 Hash',
      description: 'Generate secure, one-way SHA-256 hash output',
      icon: <Fingerprint className="w-4 h-4 text-purple-500" />
    }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Encoding & Hashing Tools</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Encode, decode, and parse tokens, URLs, and hash signatures securely
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
                onClick={() => handleEncoding(tool.action)}
                disabled={!input.trim() || loading}
                variant="primary"
                className="w-full text-xs"
              >
                {loading && tool.action === 'sha256' ? 'Hashing...' : 'Apply Tool'}
              </ToolButton>
            </div>
          );
        })}
      </div>

      {/* Security Info Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start space-x-3 shadow-inner">
        <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 text-xs">
            Security Notice
          </h3>
          <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 leading-normal">
            All operations are executed locally. Hashing functions and token decoders process inputs purely inside your browser window, ensuring no sensitive parameters or credential keys are leaked.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EncodingTools;