import { useState, useEffect } from "react";
import List, { Movie } from "./components/List/List.tsx";
import "../src/index.css";
import Search from "./components/Search/Search.tsx";
import Loader from "./components/Loader/Loader.tsx";
import useSearchQuery from "./hooks/useSearchQuery.ts";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useSearchQuery("");
  const [page, setPage] = useState(
    parseInt(searchParams.get("frontPage") || "1")
  );
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchData();
  }, [searchQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setSearchParams({ frontPage: page.toString() });
  }, [page]);

  const fetchData = async () => {
    let fetchLink = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
    if (searchQuery) {
      fetchLink = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=true&language=en-US&page=1&page=${page}`;
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
      setTotal(dataFromServer.total_pages);
      if (dataFromServer.total_pages > 20) {
        setTotal(20);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (id) {
      const currentParams = new URLSearchParams(searchParams.toString());
      navigate(`/?${currentParams.toString()}`);
    }
  };

  return (
    <div className="container">
      <div className="right_side" onClick={handleClick}>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {!loading ? (
          data.length > 0 ? (
            <List movies={data} page={page} setPage={setPage} total={total} />
          ) : (
            <p>Not Found</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default App;
