//src/App.tsx

import { useState } from 'react';
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
import DiffChecker from './components/DiffChecker';
import TimeConverter from './components/TimeConverter';
import RegexTester from './components/RegexTester';
import { Menu } from 'lucide-react';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('cleanup');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { isDark, toggleTheme } = useTheme();

  // Tab-specific buffer states for inputs and outputs
  const [inputs, setInputs] = useState<Record<ToolType, string>>({
    cleanup: '',
    case: '',
    format: '',
    encoding: '',
    generators: '',
    diff: '',
    time: '',
    regex: '',
  });

  const [outputs, setOutputs] = useState<Record<ToolType, string>>({
    cleanup: '',
    case: '',
    format: '',
    encoding: '',
    generators: '',
    diff: '',
    time: '',
    regex: '',
  });

  const input = inputs[activeTool];
  const output = outputs[activeTool];

  const setInput = (val: string) => setInputs(prev => ({ ...prev, [activeTool]: val }));
  const setOutput = (val: string) => setOutputs(prev => ({ ...prev, [activeTool]: val }));

  const stats = getTextStats(input);

  // Tools that generate their own data and do not require the primary input field
  const standaloneTool = activeTool === 'generators' || activeTool === 'time';
  const toolNeedsInput = !standaloneTool && activeTool !== 'diff';

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
      case 'time':
        return <TimeConverter onOutput={setOutput} />;
      case 'regex':
        return <RegexTester input={input} onOutput={setOutput} />;
      default:
        return <TextCleanup {...props} />;
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-[#07050e] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Navigation Sidebar (Left on Desktop, Drawer on Mobile) */}
      <Sidebar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Workspace Container (Right on Desktop) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

        {/* Mobile top navigation header (Only visible below lg breakpoint) */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-[#090714]/40 border-b border-slate-200/50 dark:border-white/5 backdrop-blur-md relative z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-slate-800 dark:text-white text-base tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              TextForge
            </span>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10">
            v1.0
          </span>
        </header>

        {/* Core Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden min-h-0 relative z-10 p-4 lg:p-6">
          <div className="flex-1 glass-panel rounded-3xl flex flex-col overflow-hidden shadow-xl shadow-purple-950/5 animate-fade-in">
            {activeTool === 'diff' ? (
              <DiffChecker
                leftValue={input}
                onLeftChange={setInput}
              />
            ) : (
              /* Uniform Double-Column Layout: Left Workspace (Input/Output stacked) & Right Control Panel */
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left Column: Text Workspace (Input / Output) */}
                <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-[#0e0a1f]/35 border-b lg:border-b-0 lg:border-r border-slate-200/50 dark:border-white/5 min-h-0">
                  {standaloneTool ? (
                    /* Standalone tools (Generators/Time): Only render output box */
                    <div className="p-6 flex-1 flex flex-col min-h-0">
                      <TextArea
                        value={output}
                        onChange={() => { }} // Read-only
                        placeholder="Generated output will appear here..."
                        label="Generated Output"
                        readOnly
                      />
                    </div>
                  ) : (
                    /* Input-reliant tools: Stack Input (top half) & Output (bottom half) vertically */
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Input panel block */}
                      <div className="flex-1 p-6 flex flex-col min-h-0 border-b border-slate-200/30 dark:border-white/5">
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
                      {/* Output panel block */}
                      <div className="flex-1 p-6 flex flex-col min-h-0">
                        <TextArea
                          value={output}
                          onChange={() => { }} // Read-only
                          placeholder="Processed output will appear here..."
                          label="Output"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Interactive Controls */}
                <div className="flex-1 bg-transparent flex flex-col min-h-0 overflow-y-auto">
                  <div className="p-6">
                    {renderToolComponent()}
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>

        {/* Stats Bar - Only show for tools that use input */}
        {toolNeedsInput && <StatsBar stats={stats} />}
      </div>
    </div>
  );
}

export default App;