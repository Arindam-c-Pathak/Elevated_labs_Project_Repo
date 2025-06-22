// src/api.js

const BASE_URL = "https://api.github.com/search/repositories";

/**
 * Fetch repositories from GitHub based on search query
 * @param {string} query - Search terms or GitHub search query (e.g. 'react')
 * @param {string} sort - Sort by stars, forks, updated
 * @param {string} language - Optional programming language
 */
export async function fetchRepositories(query = "stars:>1000", sort = "stars", language = "") {
  let searchQuery = query;
  if (language) {
    searchQuery += `+language:${language}`;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&sort=${sort}&order=desc&per_page=30`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("GitHub API error");
    const data = await response.json();
    return data.items || [];
  } catch (err) {
    console.error("API Fetch error:", err);
    return [];
  }
}
