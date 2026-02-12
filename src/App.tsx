import { useState } from 'react';
import { ToolType } from './types';
import { useTheme } from './hooks/useTheme';
import { getTextStats } from './utils/textUtils';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TextArea from './components/TextArea';
import StatsBar from './components/StatsBar';
import TextCleanup from './components/TextCleanup';
import CaseConverter from './components/CaseConverter';
import CodeFormatter from './components/CodeFormatter';
import EncodingTools from './components/EncodingTools';
import Generators from './components/Generators';
import DiffChecker from './components/DiffChecker';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('cleanup');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
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
      {/* Header */}
      <Header isDark={isDark} onThemeToggle={toggleTheme} />

      {/* Tab Navigation */}
      <TabNavigation activeTool={activeTool} onToolChange={setActiveTool} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {activeTool === 'diff' ? (
          <DiffChecker
            leftValue={input}
            onLeftChange={setInput}
          />
        ) : activeTool === 'generators' ? (
          /* Generators Layout: Tools on top, output below */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tools Panel */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0 max-h-[60vh]">
              <div className="p-6">
                {renderToolComponent()}
              </div>
            </div>

            {/* Output Panel */}
            <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-h-0">
              <div className="p-6 flex-1 flex flex-col min-h-0">
                <TextArea
                  value={output}
                  onChange={() => { }} // Read-only
                  placeholder="Generated output will appear here..."
                  label="Generated Output"
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : (
          /* Other Tools Layout: Responsive 2-column/stacked */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Input Panel */}
            <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 min-h-0">
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

            {/* Tools & Output Panel */}
            <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-h-0">
              {/* Tools Section */}
              <div className="border-b border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0 max-h-[40vh] lg:max-h-[50vh]">
                <div className="p-6">
                  {renderToolComponent()}
                </div>
              </div>

              {/* Output Section */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-6 flex-1 flex flex-col min-h-0">
                  <TextArea
                    value={output}
                    onChange={() => { }} // Read-only
                    placeholder="Processed output will appear here..."
                    label="Output"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar - Only show for tools that use input */}
      {toolNeedsInput && <StatsBar stats={stats} />}
    </div>
  );
}

export default App;