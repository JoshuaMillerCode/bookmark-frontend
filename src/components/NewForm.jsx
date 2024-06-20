import { useRef } from 'react';

export default function NewForm({ bookmarks, setBookmarks, baseUrl }) {
  const nameRef = useRef(null);
  const desRef = useRef(null);
  const linkRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: nameRef.current.value,
        description: desRef.current.value,
        link: linkRef.current.value,
      };

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="NewForm"
      style={{ textAlign: 'left' }}
      onSubmit={handleSubmit}
    >
      Name: <input type="text" ref={nameRef} />
      <br />
      Description: <input type="text" ref={desRef} />
      <br />
      Link: <input type="text" ref={linkRef} />
      <br />
      <input type="submit" value="Create Bookmark" />
    </form>
  );
}
