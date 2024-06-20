export default function Bookmark({ bookmark, handleDelete }) {
  return (
    <div key={bookmark._id} className="Bookmark">
      <a href={bookmark.link}>{bookmark.name} Link</a>
      <p>{bookmark.description}</p>
      <button
        onClick={() => {
          handleDelete(bookmark);
        }}
      >
        Delete
      </button>
    </div>
  );
}
