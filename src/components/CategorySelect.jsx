import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.js';

export default function CategorySelect({
  cats,
  selectedCategory,
  setSelectedCategory,
}) {
  const { theme } = useContext(ThemeContext);

  const handleClick = (name) => {
    setSelectedCategory(name);
  };

  // const fontColor = theme === 'light' ? '#d6ccc2' : '#203547';

  return (
    <ul className="category-list">
      {cats.length
        ? [{ _id: '1', name: 'all' }, ...cats].map((c) => {
            const themeClass =
              c.name === selectedCategory ? `item-border-${theme}` : '';
            return (
              <li
                onClick={() => {
                  handleClick(c.name);
                }}
                className={themeClass}
                key={c._id}
              >
                {c.name.toUpperCase()}
              </li>
            );
          })
        : ''}
    </ul>
  );
}
