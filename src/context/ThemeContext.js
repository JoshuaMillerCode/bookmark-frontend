import { createContext } from 'react';

export const ThemeContext = createContext('light');

export function setBodyTheme(theme, bodyRef) {
  if (!bodyRef.current) {
    bodyRef.current = document.querySelectorAll('.App')[0];
  }

  if (theme === 'dark') {
    if (!bodyRef.current.classList.contains('App-dark')) {
      bodyRef.current.classList.add('App-dark');
    }
  } else {
    if (bodyRef.current.classList.contains('App-dark')) {
      bodyRef.current.classList.remove('App-dark');
    }
  }
}
