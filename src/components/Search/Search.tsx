import React from "react";
import "./Search.css";

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const Search = ({ searchQuery, setSearchQuery }: Props) => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search") as string;

    localStorage.setItem("searchTerm", searchTerm);
  };

  return (
    <div className="search-component">
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" style={{ border: "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
