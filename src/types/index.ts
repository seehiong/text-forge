export type ToolType = 'cleanup' | 'case' | 'format' | 'encoding' | 'generators' | 'diff';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TextStats {
  words: number;
  characters: number;
  lines: number;
  charactersNoSpaces: number;
}

export interface DiffResult {
  original: string;
  modified: string;
  changes: any[]; // Using any[] for now to avoid circular dependency with 'diff' types here, or import properly if possible.
  // Actually, let's keep it simple or import types/diff if needed.
  // But for now, we can omit strict typing here if it complicates things, or just define it in the component.
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}