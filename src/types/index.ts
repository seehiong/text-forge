export type ToolType = 'cleanup' | 'case' | 'format' | 'encoding' | 'generators';

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

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}