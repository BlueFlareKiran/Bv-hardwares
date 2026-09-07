'use client';

import { createContext, useContext } from 'react';

interface ThemeContextValue {
  theme: 'light';
  resolvedTheme: 'light';
  setTheme: () => void;
}

const lightTheme: ThemeContextValue = {
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(lightTheme);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
