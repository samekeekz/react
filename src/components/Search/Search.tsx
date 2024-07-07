import React, { Component } from "react";
import { Movie } from "../List/List.tsx";
import "./Search.css";

type Props = {
  setState: (results: Movie[]) => void;
  fetchData: () => void;
};

type State = {
  results: Movie[];
  isLoading: boolean;
  searchTerm: string;
};

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      searchTerm: localStorage.getItem("searchTerm") ?? "",
    };
  }

  fetchSearchResults = async (query: string) => {
    if (!query) return this.props.fetchData();

    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTMyMjRlNmI4OGQzY2Y3OTZmNjJiNDA4Y2I1MjhkYiIsInN1YiI6IjY2MWJmMTEwYTRhZjhmMDE3YzM2ZmQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FdsWIE47QwDxR_g0fu87YukNqnQ7NGb_LAujf1fGyco",
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      this.setState({ results: data.results, isLoading: false });
      this.props.setState(data.results);
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search") as string;

    localStorage.setItem("searchTerm", searchTerm);
    this.fetchSearchResults(searchTerm);
  };

  async componentDidMount() {
    if (this.state.searchTerm !== "") {
      this.fetchSearchResults(this.state.searchTerm);
    } else {
      this.props.fetchData();
    }
  }

  render() {
    return (
      <div className="search-component">
        <form className="search-container" onSubmit={this.handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="search-input"
            defaultValue={this.state.searchTerm}
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
  }
}

export default Search;
