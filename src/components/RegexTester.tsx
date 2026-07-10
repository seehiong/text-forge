//src/components/RegexTester.tsx

import React, { useState, useEffect } from 'react';
import { matchRegex } from '../utils/regex';
import { Search, CheckSquare, Square, AlertCircle, FileSearch } from 'lucide-react';

interface RegexTesterProps {
  input: string;
  onOutput: (output: string) => void;
}

const RegexTester: React.FC<RegexTesterProps> = ({ input, onOutput }) => {
  const [pattern, setPattern] = useState<string>('\\d+');
  const [flags, setFlags] = useState({
    g: true, // global
    i: false, // case-insensitive
    m: false, // multiline
  });
  const [error, setError] = useState<string>('');

  const handleFlagChange = (flagKey: keyof typeof flags) => {
    setFlags(prev => ({
      ...prev,
      [flagKey]: !prev[flagKey]
    }));
  };

  const getActiveFlagsString = () => {
    let str = '';
    if (flags.g) str += 'g';
    if (flags.i) str += 'i';
    if (flags.m) str += 'm';
    return str;
  };

  const executeRegex = () => {
    setError('');
    if (!pattern.trim()) {
      onOutput('Please enter a regular expression pattern.');
      return;
    }

    try {
      const activeFlags = getActiveFlagsString();
      const matches = matchRegex(input, pattern, activeFlags);

      if (matches.length === 0) {
        onOutput('No matches found.');
        return;
      }

      let resultText = `FOUND ${matches.length} MATCHES:\n`;
      resultText += `===========================================\n\n`;

      matches.forEach((m, idx) => {
        resultText += `${idx + 1}. Match:  "${m.match}"\n`;
        resultText += `   Index:  ${m.index}\n`;
        if (m.groups && m.groups.length > 0) {
          resultText += `   Groups: ${m.groups.map(g => `"${g}"`).join(', ')}\n`;
        }
        resultText += `\n`;
      });

      onOutput(resultText.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid pattern');
      onOutput('');
    }
  };

  // Re-run matching automatically when input, pattern, or flags change
  useEffect(() => {
    executeRegex();
  }, [input, pattern, flags.g, flags.i, flags.m]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Regex Tester</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Input your test string in the left text area, configure your regex pattern, and view matches
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">{error}</p>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
            <Search className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Regex Pattern Configuration</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Regular expression options</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Regex Input field */}
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
              Regular Expression
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 select-none">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g. \d+"
                className="w-full pl-6 pr-6 py-2 bg-white dark:bg-[#0c0919]/55 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/5 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 select-none">/{getActiveFlagsString()}</span>
            </div>
          </div>

          {/* Flags Toggles */}
          <div className="md:col-span-4 self-end">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">Flags</span>
            <div className="flex gap-2">
              {(['g', 'i', 'm'] as Array<keyof typeof flags>).map((flag) => {
                const labelText = flag === 'g' ? 'g (global)' :
                  flag === 'i' ? 'i (ignore case)' :
                    'm (multiline)';
                const isChecked = flags[flag];
                return (
                  <button
                    key={flag}
                    type="button"
                    onClick={() => handleFlagChange(flag)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${isChecked
                      ? 'bg-purple-500/10 border-purple-500/35 text-purple-700 dark:text-purple-400'
                      : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    title={labelText}
                  >
                    <span>{flag}</span>
                    {isChecked ? (
                      <CheckSquare className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Square className="w-3.5 h-3.5 opacity-55" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50/60 dark:bg-[#120e24]/40 border border-indigo-100 dark:border-indigo-500/15 rounded-2xl p-4 flex items-start space-x-3 shadow-inner">
        <FileSearch className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-2 w-full">
          <h3 className="font-bold text-indigo-950 dark:text-slate-200 text-xs">
            How to use Regex Tester
          </h3>
          <p className="text-[11px] text-indigo-800/85 dark:text-slate-400 leading-relaxed">
            1. Paste your mock paragraph in the **Input** panel on the left.<br />
            2. Define your RegExp match pattern above (e.g. <code className="text-xs bg-indigo-100/50 dark:bg-black/35 px-1 py-0.5 rounded text-purple-700 dark:text-purple-400 font-mono">\b[a-zA-Z]{5}\b</code> to match all 5-letter words).<br />
            3. Matches, index offsets, and captured groups will render reactively in the **Output** panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
