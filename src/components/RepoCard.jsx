import React, { useState, useEffect } from "react";

const RepoCard = ({ repo }) => {
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem("bookmarks") || "[]").some((r) => r.id === repo.id)
  );

  const [contributors, setContributors] = useState(null);
  const [loadingContrib, setLoadingContrib] = useState(true);

  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (bookmarked) {
      bookmarks = bookmarks.filter((r) => r.id !== repo.id);
    } else {
      bookmarks.push(repo);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contributors`
        );
        if (!res.ok) throw new Error("Failed to fetch contributors");
        const data = await res.json();
        setContributors(data.length);
      } catch (err) {
        console.error(err);
        setContributors("Error");
      } finally {
        setLoadingContrib(false);
      }
    };

    fetchContributors();
  }, [repo.owner.login, repo.name]);

  return (
    <div className="repo-card">
      <div className="repo-details">
        <h2 className="text-xl font-bold mb-2">{repo.name}</h2>
        <p className="text-gray-700 text-sm mb-2">
          {repo.description || "(No description available)."}
        </p>
        <p className="text-sm text-gray-500">
          ⭐Stars: {repo.stargazers_count} | 🍴Forks: {repo.forks_count}  | 🕗Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
        </p>
        {loadingContrib && (
          <p className="text-xs text-gray-500 mt-1">Loading contributors...</p>
        )}
        {!loadingContrib && contributors !== "Error" && (
          <p className="text-xs text-gray-700 mt-1">👥 Contributors: {contributors}</p>
        )}
        {contributors === "Error" && (
          <p className="text-xs text-red-500 mt-1">⚠️ Contributor info unavailable</p>
        )}

        {/* Open Issues */}
        {typeof repo.open_issues_count === "number" && (
          <p className="text-xs text-gray-700 mt-1">
            🐞 Open Issues: {repo.open_issues_count}
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p><a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          GitHub Repository
        </a></p>
        <button
          onClick={toggleBookmark}
          className={`bookmark-btn ${bookmarked ? "bookmarked" : "unbookmarked"}`}
        >
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default RepoCard;
