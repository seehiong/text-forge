import React, { useState } from 'react';
import { ToolType } from './types';
import { useTheme } from './hooks/useTheme';
import { getTextStats } from './utils/textUtils';
import Sidebar from './components/Sidebar';
import TextArea from './components/TextArea';
import StatsBar from './components/StatsBar';
import TextCleanup from './components/TextCleanup';
import CaseConverter from './components/CaseConverter';
import CodeFormatter from './components/CodeFormatter';
import EncodingTools from './components/EncodingTools';
import Generators from './components/Generators';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('cleanup');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [showTools, setShowTools] = useState<boolean>(false);
  const { isDark, toggleTheme } = useTheme();

  const stats = getTextStats(input);

  // Check if current tool needs input (generators don't need input)
  const toolNeedsInput = activeTool !== 'generators';

  const renderToolComponent = () => {
    const props = { input, onOutput: setOutput };
    
    switch (activeTool) {
      case 'cleanup':
        return <TextCleanup {...props} />;
      case 'case':
        return <CaseConverter {...props} />;
      case 'format':
        return <CodeFormatter {...props} />;
      case 'encoding':
        return <EncodingTools {...props} />;
      case 'generators':
        return <Generators onOutput={setOutput} />;
      default:
        return <TextCleanup {...props} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header for mobile */}
      <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            TextForge
          </h1>
          <button
            onClick={() => setShowTools(!showTools)}
            className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-medium"
          >
            {showTools ? 'Hide Tools' : 'Show Tools'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <Sidebar
          activeTool={activeTool}
          onToolChange={(tool) => {
            setActiveTool(tool);
            setShowTools(true); // Auto-show tools when selecting a new tool on mobile
          }}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Desktop Layout: Three columns side by side */}
          <div className="hidden lg:flex flex-1 overflow-hidden">
            {/* Left Panel - Input */}
            <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="p-6 flex-1 flex flex-col min-h-0">
                <TextArea
                  value={input}
                  onChange={setInput}
                  placeholder="Paste or type your text here..."
                  label="Input"
                  onClear={() => {
                    setInput('');
                    setOutput('');
                  }}
                />
              </div>
            </div>

            {/* Center Panel - Tools */}
            <div className="w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <div className="p-6">
                {renderToolComponent()}
              </div>
            </div>

            {/* Right Panel - Output */}
            <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
              <div className="p-6 flex-1 flex flex-col min-h-0">
                <TextArea
                  value={output}
                  onChange={() => {}} // Read-only
                  placeholder="Processed output will appear here..."
                  label="Output"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout: Adaptive based on tool type */}
          <div className="lg:hidden flex flex-col flex-1 overflow-hidden min-h-0">
            {/* Tools Panel - Always visible when showTools is true */}
            {showTools && (
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0" 
                   style={{ maxHeight: activeTool === 'generators' ? '60vh' : '40vh' }}>
                <div className="p-4">
                  {renderToolComponent()}
                </div>
              </div>
            )}

            {/* Content Area - Adaptive layout */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              {activeTool === 'generators' ? (
                /* Generators: Only show output on mobile when tools are visible */
                showTools ? (
                  <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-h-0">
                    <div className="p-4 flex-1 flex flex-col min-h-0">
                      <TextArea
                        value={output}
                        onChange={() => {}} // Read-only
                        placeholder="Generated output will appear here..."
                        label="Generated Output"
                        readOnly
                      />
                    </div>
                  </div>
                ) : (
                  /* Show a message when tools are hidden for generators */
                  <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800 p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Utility Generators
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Generate UUIDs, passwords, and other useful data
                      </p>
                      <button
                        onClick={() => setShowTools(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Show Generator Tools
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Other tools: Show input and output in split view */
                <>
                  {/* Input Panel */}
                  <div className="flex-1 flex flex-col border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-0">
                    <div className="p-4 flex-1 flex flex-col min-h-0">
                      <TextArea
                        value={input}
                        onChange={setInput}
                        placeholder="Paste or type your text here..."
                        label="Input"
                        onClear={() => {
                          setInput('');
                          setOutput('');
                        }}
                      />
                    </div>
                  </div>

                  {/* Output Panel */}
                  <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-h-0">
                    <div className="p-4 flex-1 flex flex-col min-h-0">
                      <TextArea
                        value={output}
                        onChange={() => {}} // Read-only
                        placeholder="Processed output will appear here..."
                        label="Output"
                        readOnly
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Only show for tools that use input */}
      {(toolNeedsInput || window.innerWidth >= 1024) && <StatsBar stats={stats} />}
    </div>
  );
}

export default App;