import { useTheme as useThemeContext } from '@/context/themeContext';

/**
 * Convenience hook that surfaces the theme utilities. Returns the same shape
 * as the raw context hook but makes the import path shorter and the intent
 * clearer at the call-site.
 *
 * @example
 *   const { theme, setTheme, toggleTheme } = useTheme();
 *   <button onClick={toggleTheme}>Toggle theme</button>
 */
export function useTheme() {
  return useThemeContext();
}
