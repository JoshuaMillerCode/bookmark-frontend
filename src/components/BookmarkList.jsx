import Bookmark from './Bookmark';

export default function BookmarksList({ bookmarks, setBookmarks, baseUrl }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/bookmarks/` + id, {
        method: 'DELETE',
      });

      if (response.status !== 201) {
        return;
      }

      const deletedBookmark = await response.json();

      // Filtering the deleted bookmark from the state array
      const filtered = bookmarks.filter((b) => b._id !== deletedBookmark._id);

      setBookmarks(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ul className="BookmarkList">
      {bookmarks.length ? (
        bookmarks.map((b) => {
          return (
            <Bookmark key={b._id} bookmark={b} handleDelete={handleDelete} />
          );
        })
      ) : (
        <p>No bookmarks found :/</p>
      )}
    </ul>
  );
}
