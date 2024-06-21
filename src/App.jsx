import { useState, useEffect, useRef } from 'react';
import NewForm from './components/NewForm';
import BookmarkList from './components/BookmarkList';
import Title from './components/Title';
import { ThemeContext, setBodyTheme } from './context/ThemeContext';
import ThemeIcon from './components/ThemeIcon';

import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [theme, setTheme] = useState('light');
  const bodyRef = useRef(null);

  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookmarks`);

        if (response.status !== 200) {
          return;
        }

        const data = await response.json();

        setBookmarks(data);
      } catch (err) {
        console.log(err);
      }
    };

    getBookmarks();
  }, [deleteToggle, theme]);

  useEffect(() => {
    setBodyTheme(theme, bodyRef);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`App App-${theme}`}>
        <Title>Bookmarks</Title>

        <ThemeIcon />

        <NewForm
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          baseUrl={BASE_URL}
        />

        <BookmarkList
          bookmarks={bookmarks}
          deleteToggle={deleteToggle}
          setDeleteToggle={setDeleteToggle}
          baseUrl={BASE_URL}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
