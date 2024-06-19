import { useState, useEffect } from 'react';
import NewForm from './components/NewForm';
import Bookmarks from './components/Bookmarks';
import Title from './components/Title';
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookmarks`);
        const data = await response.json();
        setBookmarks(data);
      } catch (err) {
        console.log(err);
      }
    };

    getBookmarks();
  }, [deleteToggle]);

  return (
    <>
      <Title>Bookmarks</Title>

      <NewForm
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        baseUrl={BASE_URL}
      />

      <Bookmarks
        bookmarks={bookmarks}
        deleteToggle={deleteToggle}
        setDeleteToggle={setDeleteToggle}
      />
    </>
  );
}

export default App;
