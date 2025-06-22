import React, { useEffect, useState } from "react";

const BookmarkPanel = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(stored);
  }, []);

  const removeBookmark = (id) => {
    const updated = bookmarks.filter(repo => repo.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="bookmark-panel">
      <h3 className="bookmark-header">Bookmarked Repositories</h3>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">No bookmarks yet. Refresh page.</p>
      ) : (
        <ul className="bookmark-list">
          {bookmarks.map((repo) => (
            <li key={repo.id} className="bookmark-item">
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                >{repo.name}
                </a>
              </div>
              <button
                onClick={() => removeBookmark(repo.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkPanel;
