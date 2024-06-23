import { useState, useEffect, useRef } from 'react';
import NewForm from './components/NewForm';
import BookmarkList from './components/BookmarkList';
import Title from './components/Title';
import { ThemeContext, setBodyTheme } from './context/ThemeContext';
import ThemeIcon from './components/ThemeIcon';
import CategorySelect from './components/CategorySelect';
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const bodyRef = useRef(null);
  const [cats, setCats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        let url = `${BASE_URL}/bookmarks/`;

        if (selectedCategory !== 'all') {
          url += '?category=' + selectedCategory;
        }

        const response = await fetch(url);

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
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('theme', theme);

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
          cats={cats}
          setCats={setCats}
        />

        <CategorySelect
          cats={cats}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <BookmarkList
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          baseUrl={BASE_URL}
          cats={cats}
          setCats={setCats}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
