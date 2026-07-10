//src/components/Generators.tsx

import React, { useState } from 'react';
import { generateUUID, generatePassword } from '../utils/generators';
import { generateLorem } from '../utils/lorem';
import ToolButton from './ToolButton';
import {
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  AlertCircle,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react';

interface GeneratorsProps {
  onOutput: (output: string) => void;
}

type LoremType = 'paragraphs' | 'sentences' | 'words';

const Generators: React.FC<GeneratorsProps> = ({ onOutput }) => {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [passwordOptions, setPasswordOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });

  const [loremCount, setLoremCount] = useState<number>(3);
  const [loremType, setLoremType] = useState<LoremType>('paragraphs');
  const [error, setError] = useState<string>('');

  const handleUUIDGeneration = (version: 1 | 4) => {
    try {
      const uuid = generateUUID(version);
      onOutput(uuid);
      setError('');
    } catch (err) {
      setError('Failed to generate UUID');
    }
  };

  const handlePasswordGeneration = () => {
    try {
      const password = generatePassword(passwordLength, passwordOptions);
      onOutput(password);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate password');
    }
  };

  const handleLoremGeneration = () => {
    try {
      const lorem = generateLorem(loremCount, loremType);
      onOutput(lorem);
      setError('');
    } catch (err) {
      setError('Failed to generate lorem ipsum');
    }
  };

  const handleOptionChange = (option: keyof typeof passwordOptions) => {
    setPasswordOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Utility Generators</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Generate secure passwords, unique resource identifiers, and lorem ipsum placeholders
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">{error}</p>
        </div>
      )}

      {/* Generators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* UUID Generator */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                <Fingerprint className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">UUID Generator</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Unique resource identifiers</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Universally Unique Identifiers (UUIDs) can be generated either randomly (v4) or structured based on timestamp coordinates (v1).
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ToolButton
              onClick={() => handleUUIDGeneration(4)}
              variant="primary"
              className="w-full text-xs"
            >
              Generate UUID v4 (Random)
            </ToolButton>
            <ToolButton
              onClick={() => handleUUIDGeneration(1)}
              variant="secondary"
              className="w-full text-xs"
            >
              Generate UUID v1 (Timestamp)
            </ToolButton>
          </div>
        </div>

        {/* Password Generator */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
                <LockKeyhole className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Password Generator</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">High-entropy passcodes</p>
              </div>
            </div>

            {/* Length Slider */}
            <div className="mb-4 bg-slate-900/5 dark:bg-black/15 p-4 rounded-xl border border-slate-200/50 dark:border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Length
                </label>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                  {passwordLength} chars
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-[#1a1635] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Options Checkbox Grid */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(passwordOptions).map(([key, value]) => {
                const labelText = key === 'lowercase' ? 'a-z' :
                  key === 'uppercase' ? 'A-Z' :
                    key === 'numbers' ? '0-9' :
                      '!@#$';
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleOptionChange(key as keyof typeof passwordOptions)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 ${value
                        ? 'bg-purple-500/10 border-purple-500/35 text-purple-700 dark:text-purple-400'
                        : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-500'
                      }`}
                  >
                    <span className="capitalize">{labelText}</span>
                    {value ? (
                      <CheckSquare className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Square className="w-3.5 h-3.5 opacity-55" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <ToolButton
            onClick={handlePasswordGeneration}
            variant="primary"
            className="w-full text-xs"
            disabled={!Object.values(passwordOptions).some(Boolean)}
          >
            Generate Password
          </ToolButton>
        </div>

        {/* Lorem Ipsum Generator */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Lorem Ipsum</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Placeholder copy snippets</p>
              </div>
            </div>

            {/* Count Input */}
            <div className="mb-4 bg-slate-900/5 dark:bg-black/15 p-4 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Count:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={loremCount}
                  onChange={(e) => setLoremCount(Math.max(1, Number(e.target.value)))}
                  className="w-16 px-2 py-0.5 bg-white dark:bg-[#0c0919]/55 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/5 rounded-md font-mono text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                {(['paragraphs', 'sentences', 'words'] as LoremType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLoremType(type)}
                    className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-bold transition-all capitalize border ${loremType === type
                        ? 'bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400'
                        : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ToolButton
            onClick={handleLoremGeneration}
            variant="primary"
            className="w-full text-xs"
          >
            Generate Placeholder
          </ToolButton>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start space-x-3 shadow-inner">
        <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-xs">
            Local Data Integrity
          </h3>
          <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 leading-normal">
            No generated passwords or unique strings are ever sent over network channels. All keys are derived cryptographically inside your local sandbox.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Generators;