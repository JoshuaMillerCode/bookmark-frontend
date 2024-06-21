import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Bookmark({ bookmark, handleDelete }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div key={bookmark._id} className={`Bookmark Bookmark-${theme}`}>
      <a target="_blank" href={bookmark.link}>
        {bookmark.name} Link
      </a>
      <p>
        <strong>{bookmark.description}</strong>
      </p>
      <button
        onClick={() => {
          handleDelete(bookmark);
        }}
      >
        Delete
      </button>
    </div>
  );
}
