import { useState, useEffect } from 'react';
import NewForm from './components/NewForm';
import BookmarkList from './components/BookmarkList';
import Title from './components/Title';
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

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
  }, []);

  return (
    <>
      <Title>Bookmarks</Title>

      <NewForm
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        baseUrl={BASE_URL}
      />

      <BookmarkList
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        baseUrl={BASE_URL}
      />
    </>
  );
}

export default App;
