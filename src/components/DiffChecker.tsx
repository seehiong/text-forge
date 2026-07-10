//src/components/DiffChecker.tsx

import React, { useState, useEffect } from 'react';
import * as Diff from 'diff';
import { FileDiff } from 'lucide-react';
import TextArea from './TextArea';

interface DiffCheckerProps {
    leftValue?: string;
    onLeftChange?: (value: string) => void;
}

type DiffMode = 'chars' | 'words' | 'lines';

const DiffChecker: React.FC<DiffCheckerProps> = ({ leftValue = '', onLeftChange }) => {
    const [localOriginal, setLocalOriginal] = useState(leftValue);
    const original = onLeftChange ? leftValue : localOriginal;
    const setOriginal = (val: string) => {
        setLocalOriginal(val);
        if (onLeftChange) onLeftChange(val);
    };

    const [modified, setModified] = useState('');
    const [diffMode, setDiffMode] = useState<DiffMode>('words');
    const [diffs, setDiffs] = useState<Diff.Change[]>([]);

    useEffect(() => {
        let result;
        if (diffMode === 'chars') {
            result = Diff.diffChars(original, modified);
        } else if (diffMode === 'words') {
            result = Diff.diffWords(original, modified);
        } else {
            result = Diff.diffLines(original, modified);
        }
        setDiffs(result);
    }, [original, modified, diffMode]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-transparent">
            {/* Function Bar */}
            <div className="bg-white/40 dark:bg-[#0c0919]/45 border-b border-slate-200/50 dark:border-white/5 px-6 py-3.5 flex items-center justify-between flex-shrink-0 backdrop-blur-md">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Diff Mode</span>
                        <div className="flex bg-slate-200/60 dark:bg-black/20 border border-slate-200/60 dark:border-white/5 rounded-xl p-1">
                            {(['chars', 'words', 'lines'] as DiffMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setDiffMode(mode)}
                                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${diffMode === mode
                                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/15'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto lg:overflow-hidden bg-transparent">
                {/* Input Area (Split View) */}
                <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0 border-b border-slate-200/50 dark:border-white/5 shrink-0 bg-transparent">
                    <div className="h-80 lg:h-auto lg:flex-1 p-5 border-b lg:border-b-0 lg:border-r border-slate-200/50 dark:border-white/5 flex flex-col bg-transparent">
                        <TextArea
                            value={original}
                            onChange={setOriginal}
                            placeholder="Paste original text here to compare..."
                            label="Original Text"
                            onClear={() => setOriginal('')}
                        />
                    </div>
                    <div className="h-80 lg:h-auto lg:flex-1 p-5 flex flex-col bg-transparent">
                        <TextArea
                            value={modified}
                            onChange={setModified}
                            placeholder="Paste modified text here to compare..."
                            label="Modified Text"
                            onClear={() => setModified('')}
                        />
                    </div>
                </div>

                {/* Diff Output */}
                <div className="flex-1 bg-white/20 dark:bg-[#0c0919]/25 flex flex-col min-h-[400px] lg:min-h-0">
                    <div className="p-4 border-b border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-[#120e24]/40 flex-shrink-0">
                        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase flex items-center">
                            <FileDiff className="w-4 h-4 mr-2 text-purple-500" />
                            Difference Result
                        </h3>
                    </div>
                    <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed bg-white/40 dark:bg-[#080614]/40">
                        {diffs.length === 0 || (diffs.length === 1 && diffs[0].value === '') ? (
                            <div className="text-slate-400 dark:text-slate-500 italic text-xs">
                                Enter text in both fields above to compute and visualize differences...
                            </div>
                        ) : (
                            <div className="rounded-xl whitespace-pre-wrap">
                                {diffs.map((part, index) => {
                                    const color = part.added
                                        ? 'bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 px-1 py-0.5 rounded border border-emerald-500/20'
                                        : part.removed
                                            ? 'bg-rose-500/15 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400 line-through px-1 py-0.5 rounded border border-rose-500/20'
                                            : 'text-slate-600 dark:text-slate-300';

                                    return (
                                        <span key={index} className={`${color} inline-block`}>
                                            {part.value}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffChecker;
