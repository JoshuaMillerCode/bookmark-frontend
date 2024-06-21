import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeIcon() {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeClass =
    theme === 'light' ? 'fa-solid fa-moon' : 'fa-regular fa-sun';

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <i onClick={handleClick} className={`fa-3x ${themeClass} icon `}></i>;
}
