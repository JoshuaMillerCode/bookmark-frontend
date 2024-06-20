import Bookmark from './Bookmark';

export default function BookmarksList({
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
