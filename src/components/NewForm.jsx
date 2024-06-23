import { useRef, useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function NewForm({
  bookmarks,
  setBookmarks,
  baseUrl,
  cats,
  setCats,
}) {
  const nameRef = useRef(null);
  const desRef = useRef(null);
  const linkRef = useRef(null);
  const catRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [catToggle, setCatToggle] = useState(false);
  const [catOption, setCatOption] = useState('');
  const [newCat, setNewCat] = useState(false);

  useEffect(() => {
    async function getCats() {
      try {
        const response = await fetch(`${baseUrl}/categories`);
        const foundCats = await response.json();
        setCats(foundCats);
      } catch (err) {
        console.log(err);
      }
    }

    getCats();
  }, [newCat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: nameRef.current.value,
        description: desRef.current.value,
        link: linkRef.current.value,
      };

      if (catOption === 'create') {
        body.category = catRef.current.value;
      } else if (catOption !== 'nothing') {
        body.category = catOption;
      }

      const response = await fetch(`${baseUrl}/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 201) {
        return;
      }

      const data = await response.json();

      setBookmarks([...bookmarks, data]);

      nameRef.current.value = '';
      desRef.current.value = '';
      linkRef.current.value = '';
      catRef.current.value = '';

      if (catOption === 'create') {
        setNewCat(!newCat);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCatChange = (e) => {
    setCatOption(e.target.value);

    if (e.target.value === 'create') {
      setCatToggle(true);
    } else {
      catRef.current.value = '';
      setCatToggle(false);
    }
  };

  return (
    <form
      className={`NewForm NewForm-${theme}`}
      style={{ textAlign: 'left' }}
      onSubmit={handleSubmit}
    >
      Name <br /> <input type="text" name="name" ref={nameRef} />
      <div>
        <span>Category</span> {/* <br /> */}
        <select onChange={handleCatChange} defaultChecked={catOption}>
          {cats.length ? (
            cats
              .map((c, i) => {
                if (i === 0) {
                  return (
                    <option selected key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  );
                }

                return (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                );
              })
              .concat([
                <option key="create" value="create">
                  Create New
                </option>,
                <option key="create" value="nothing">
                  --
                </option>,
              ])
          ) : (
            <>
              <option value="create">Create New</option>
              <option selected key="create" value="nothing">
                --
              </option>
            </>
          )}
        </select>
      </div>
      <br />
      {catToggle ? (
        <>
          New Category <br /> <input type="text" ref={catRef} />
          <br />
        </>
      ) : (
        ''
      )}
      Description <br /> <input type="text" ref={desRef} />
      <br />
      Link <br /> <input type="text" ref={linkRef} />
      <br />
      <input type="submit" value="Create Bookmark" />
    </form>
  );
}
