import Bookmark from './Bookmark';

export default function BookmarksList({ bookmarks, setBookmarks, baseUrl }) {
  const handleDelete = async (b) => {
    try {
      const response = await fetch(`${baseUrl}/bookmarks/` + b._id, {
        method: 'DELETE',
      });

      const deletedBookmark = await response.json();

      setBookmarks(bookmarks.filter((b) => b._id !== deletedBookmark._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ul className="BookmarkList">
        {bookmarks.length ? (
          bookmarks.map((b) => {
            return (
              <Bookmark key={b._id} bookmark={b} handleDelete={handleDelete} />
            );
          })
        ) : (
          <p>
            <strong>No bookmarks found</strong>
          </p>
        )}
      </ul>
    </>
  );
}
