import React, { useState } from 'react';
import { generateUUID, generatePassword } from '../utils/generators';
import ToolButton from './ToolButton';

interface GeneratorsProps {
  onOutput: (output: string) => void;
}

const Generators: React.FC<GeneratorsProps> = ({ onOutput }) => {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [passwordOptions, setPasswordOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });
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

  const handleOptionChange = (option: keyof typeof passwordOptions) => {
    setPasswordOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Utility Generators
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Generate UUIDs, passwords, and other useful data
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Generators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UUID Generator */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">UUID Generator</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Generate universally unique identifiers for your applications
          </p>
          
          <div className="flex flex-col gap-3">
            <ToolButton
              onClick={() => handleUUIDGeneration(4)}
              variant="primary"
              className="w-full"
            >
              Generate UUID v4 (Random)
            </ToolButton>
            <ToolButton
              onClick={() => handleUUIDGeneration(1)}
              variant="secondary"
              className="w-full"
            >
              Generate UUID v1 (Timestamp)
            </ToolButton>
          </div>
        </div>

        {/* Password Generator */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Password Generator</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Generate secure, random passwords with customizable options
          </p>
          
          {/* Length Slider */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Length: {passwordLength}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>
          
          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Object.entries(passwordOptions).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleOptionChange(key as keyof typeof passwordOptions)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {key === 'lowercase' ? 'a-z' : 
                   key === 'uppercase' ? 'A-Z' : 
                   key === 'numbers' ? '0-9' : 
                   '!@#$%'}
                </span>
              </label>
            ))}
          </div>
          
          <ToolButton
            onClick={handlePasswordGeneration}
            variant="primary"
            className="w-full"
            disabled={!Object.values(passwordOptions).some(Boolean)}
          >
            Generate Password
          </ToolButton>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
          Security Best Practices
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          Use strong passwords with mixed characters. UUIDs are suitable for unique identifiers but not for security purposes.
        </p>
      </div>
    </div>
  );
};

export default Generators;