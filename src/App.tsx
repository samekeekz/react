import { useState, useEffect } from "react";
import List, { Movie } from "./components/List/List.tsx";
import "../src/index.css";
import Search from "./components/Search/Search.tsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchTerm") ?? ""
  );

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    let fetchLink = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`;
    if (searchQuery) {
      fetchLink = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=true&language=en-US&page=1`;
    }
    setLoading(true);
    try {
      const response = await fetch(fetchLink, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTMyMjRlNmI4OGQzY2Y3OTZmNjJiNDA4Y2I1MjhkYiIsInN1YiI6IjY2MWJmMTEwYTRhZjhmMDE3YzM2ZmQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FdsWIE47QwDxR_g0fu87YukNqnQ7NGb_LAujf1fGyco",
        },
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const dataFromServer = await response.json();
      setData(dataFromServer.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!loading ? (
        <List movies={data} />
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
};

export default App;
