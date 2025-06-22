import {React,  useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RepoCard from "../components/RepoCard";
import BookmarkPanel from "../components/BookmarkPanel";
import NoteBox from "../components/NoteBox";
import { fetchRepositories } from "../api";


const Home = () => {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("stars:>1000");
  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const loadRepos = async () => {
      const result = await fetchRepositories(query, sort, language);
      setRepos(result);
    };
    loadRepos();
  }, [query, sort, language]);

  return (
    <div className="app-container">
      <div className="dashboard-layout">
      {/* Main Section */}
      <div className="main-content">
        <h1 className="main-title">Explore GitHub Repositories </h1>
        <SearchBar setQuery={setQuery} />
        <Filters sort={sort} setSort={setSort} language={language} setLanguage={setLanguage} />
        <div className="repo-grid">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>      
      </div>
      {/* Sidebar */}
        <BookmarkPanel />
      </div>
      <footer className="footer">Built by Arindam © 2024</footer>

      <NoteBox />

    </div>
  );
};

export default Home;