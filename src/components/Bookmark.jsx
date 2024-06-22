import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Bookmark({ bookmark, handleDelete }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div key={bookmark._id} className={`Bookmark Bookmark-${theme}`}>
      <a target="_blank" href={bookmark.link} className="bounce-hover">
        {bookmark.name}
      </a>
      <p>
        <strong>{bookmark.description}</strong>
      </p>
      <i
        className="fa-regular fa-trash-can fa-2x shake-hover"
        style={{ color: '#e11414' }}
        onClick={() => {
          handleDelete(bookmark);
        }}
      />
    </div>
  );
}
