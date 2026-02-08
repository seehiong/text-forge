import React, { useState, useEffect } from 'react';
import * as Diff from 'diff';
import { FileDiff } from 'lucide-react';
import TextArea from './TextArea';

interface DiffCheckerProps {
    leftValue?: string;
    onLeftChange?: (value: string) => void;
}

type DiffMode = 'chars' | 'words' | 'lines';

/**
 * DiffMode Explanations:
 * - chars: Compares character by character. Good for spotting typos or small changes within words.
 * - words: Compares word by word (whitespace delimited). Best for natural text and sentences.
 * - lines: Compares line by line. Ideal for code or structured data comparisons.
 */

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
        // Generate differences whenever inputs change
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
        <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Function Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 mr-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Diff Mode:</span>
                        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button
                                onClick={() => setDiffMode('chars')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${diffMode === 'chars'
                                    ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                Chars
                            </button>
                            <button
                                onClick={() => setDiffMode('words')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${diffMode === 'words'
                                    ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                Words
                            </button>
                            <button
                                onClick={() => setDiffMode('lines')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${diffMode === 'lines'
                                    ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                Lines
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* Input Area (Split View) */}
                <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    <div className="h-80 lg:h-auto lg:flex-1 p-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex flex-col">
                        <TextArea
                            value={original}
                            onChange={setOriginal}
                            placeholder="Paste original text here..."
                            label="Original Text"
                            onClear={() => setOriginal('')}
                        />
                    </div>
                    <div className="h-80 lg:h-auto lg:flex-1 p-4 flex flex-col">
                        <TextArea
                            value={modified}
                            onChange={setModified}
                            placeholder="Paste modified text here..."
                            label="Modified Text"
                            onClear={() => setModified('')}
                        />
                    </div>
                </div>

                {/* Diff Output */}
                <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col min-h-[400px] lg:min-h-0">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <FileDiff className="w-4 h-4 mr-2" />
                            Difference Result
                        </h3>
                    </div>
                    <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed">
                        {diffs.length === 0 ? (
                            <div className="text-gray-400 dark:text-gray-500 italic">
                                Enter text in both fields to see differences...
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded p-1">
                                {diffs.map((part, index) => {
                                    const color = part.added
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-0.5 rounded'
                                        : part.removed
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 decoration-line-through px-0.5 rounded'
                                            : 'text-gray-600 dark:text-gray-400';

                                    return (
                                        <span key={index} className={color}>
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
