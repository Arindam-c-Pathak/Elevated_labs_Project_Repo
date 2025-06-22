import React from "react";

const Filters = ({ sort, setSort, language, setLanguage }) => {
  const sortOptions = [
    { value: "stars", label: "Stars" },
    { value: "updated", label: "Latest Update" },
    { value: "forks", label: "Forks" },
  ];

  const languageOptions = [
    "", "JavaScript", "Python", "Java", "TypeScript", "C++", "C#", "Go", "Ruby", "PHP"
  ];

  return (
    <div className="filters">
      <div>
        <label className="mr-2 font-semibold">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select-box"
        >
          {sortOptions.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="select-box"
        >
          {languageOptions.map((lang) => (
            <option value={lang.toLowerCase()} key={lang}>{lang || "All"}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
