export default function Bookmarks({
  bookmarks,
  deleteToggle,
  setDeleteToggle,
  baseUrl,
}) {
  const handleDelete = async (b) => {
    try {
      await fetch(`${baseUrl}/bookmarks/` + b._id, {
        method: 'DELETE',
      });
      setDeleteToggle(!deleteToggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ul>
      {bookmarks.length ? (
        bookmarks.map((b) => {
          return (
            <div
              key={b._id}
              style={{
                border: '2px solid white',
                margin: '5px',
                padding: '10px',
              }}
            >
              <a href={b.link}>{b.name} Link</a>
              <p>{b.description}</p>
              <button
                onClick={() => {
                  handleDelete(b);
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <p>No bookmarks found :/</p>
      )}
    </ul>
  );
}
