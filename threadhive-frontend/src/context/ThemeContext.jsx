import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleDarkMode as toggleDarkModeAction } from '../store/themeSlice';

export function ThemeProvider({ children }) {
  const { darkMode } = useSelector(selectTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      return;
    }

    document.documentElement.removeAttribute('data-theme');
  }, [darkMode]);

  return children;
}

export function useTheme() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectTheme);

  return useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => dispatch(toggleDarkModeAction()),
    }),
    [darkMode, dispatch],
  );
}
