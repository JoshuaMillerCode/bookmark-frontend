export default function Bookmark({ bookmark, handleDelete }) {
  return (
    <div key={bookmark._id} className="Bookmark Bookmark-light">
      <a target="_blank" href={bookmark.link}>
        {bookmark.name} Link
      </a>
      <p>
        <strong>{bookmark.description}</strong>
      </p>
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
