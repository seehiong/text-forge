//src/components/TimeConverter.tsx

import React, { useState } from 'react';
import { epochToISO, epochToUTC, epochToLocal, isoToEpoch } from '../utils/time';
import ToolButton from './ToolButton';
import { Clock, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

interface TimeConverterProps {
  onOutput: (output: string) => void;
}

const TimeConverter: React.FC<TimeConverterProps> = ({ onOutput }) => {
  const [epochInput, setEpochInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [isMs, setIsMs] = useState<boolean>(false);
  const [isoInput, setIsoInput] = useState<string>(new Date().toISOString());
  const [error, setError] = useState<string>('');

  const handleEpochConvert = () => {
    setError('');
    try {
      const num = Number(epochInput.trim());
      if (isNaN(num)) throw new Error('Timestamp must be a number');

      const iso = epochToISO(num, isMs);
      const utc = epochToUTC(num, isMs);
      const local = epochToLocal(num, isMs);

      const result = `ISO-8601:    ${iso}\nUTC Time:    ${utc}\nLocal Time:  ${local}`;
      onOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid timestamp');
    }
  };

  const handleIsoConvert = () => {
    setError('');
    try {
      const { seconds, milliseconds } = isoToEpoch(isoInput.trim());
      const result = `Epoch Seconds:      ${seconds}\nEpoch Milliseconds: ${milliseconds}`;
      onOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid ISO format');
    }
  };

  const setTimeToNow = () => {
    const now = Date.now();
    if (isMs) {
      setEpochInput(now.toString());
    } else {
      setEpochInput(Math.floor(now / 1000).toString());
    }
    setError('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span>Time Converter</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Convert between Unix Epoch timestamps and human-readable ISO-8601 datetimes
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Epoch to Date Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Epoch to Date</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Convert numbers into readable dates</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                  Epoch Timestamp
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={epochInput}
                    onChange={(e) => setEpochInput(e.target.value)}
                    placeholder="e.g. 1783344000"
                    className="flex-1 px-3 py-2 bg-white dark:bg-[#0c0919]/55 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/5 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                  <ToolButton
                    onClick={setTimeToNow}
                    variant="secondary"
                    className="text-xs shrink-0 py-2"
                  >
                    Now
                  </ToolButton>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/5 dark:bg-black/15 p-2 rounded-xl border border-slate-200/50 dark:border-white/5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 select-none">Resolution:</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsMs(false);
                    // Adjust input length if user switches from MS to seconds
                    if (epochInput.length > 11) {
                      setEpochInput(prev => Math.floor(Number(prev) / 1000).toString());
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!isMs
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  Seconds (10d)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMs(true);
                    // Adjust input length if user switches from seconds to MS
                    if (epochInput.length <= 11) {
                      setEpochInput(prev => (Number(prev) * 1000).toString());
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isMs
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  Milliseconds (13d)
                </button>
              </div>
            </div>
          </div>

          <ToolButton
            onClick={handleEpochConvert}
            variant="primary"
            className="w-full text-xs"
            disabled={!epochInput.trim()}
          >
            Convert Epoch
          </ToolButton>
        </div>

        {/* Date to Epoch Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
                <Calendar className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Date to Epoch</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Convert strings back to numbers</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                  ISO-8601 Date String
                </label>
                <input
                  type="text"
                  value={isoInput}
                  onChange={(e) => setIsoInput(e.target.value)}
                  placeholder="e.g. 2026-07-06T13:20:00.000Z"
                  className="w-full px-3 py-2 bg-white dark:bg-[#0c0919]/55 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/5 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div className="p-3 bg-slate-900/5 dark:bg-black/15 rounded-xl border border-slate-200/50 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                <span className="font-black text-slate-600 dark:text-slate-300 block mb-0.5">Tip:</span>
                Supports standard ISO datetime formats including timezone offsets (e.g. UTC Z, +08:00, or -05:00).
              </div>
            </div>
          </div>

          <ToolButton
            onClick={handleIsoConvert}
            variant="primary"
            className="w-full text-xs"
            disabled={!isoInput.trim()}
          >
            Convert ISO Date
          </ToolButton>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/15 rounded-2xl p-4 flex items-start space-x-3 shadow-inner">
        <ShieldCheck className="w-4.5 h-4.5 text-purple-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 text-xs">
            Client-Side Time Conversions
          </h3>
          <p className="text-[11px] text-purple-700/80 dark:text-purple-400/80 leading-normal">
            Calculations are computed locally using JavaScript's native `Date` object API. Timezones automatically resolve based on your browser environment's settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeConverter;
