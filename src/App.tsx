import { useEffect } from "react";
import List from "./components/List/List.tsx";
import "../src/index.css";
import Search from "./components/Search/Search.tsx";
import Loader from "./components/Loader/Loader.tsx";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { RootState } from "./store";
import { useFetchMoviesQuery } from "./store/api/apiSlice.ts";
import {
  setCurrentPage,
  setCurrentPageData,
  setTotal,
} from "./store/slices/movieSlice.ts";
import { hideFlyout, showFlyout } from "./store/slices/flyoutSlice.ts";
import Flyout from "./components/Flyout/Flyout.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.tsx";
import { useTheme } from "./hooks/useTheme.ts";

const App = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentPage = useAppSelector(
    (state: RootState) => state.movies.currentPage
  );
  const currentPageData = useAppSelector(
    (state: RootState) => state.movies.currentPageData
  );
  const total = useAppSelector((state: RootState) => state.movies.total);
  const searchQuery =
    new URLSearchParams(searchParams.toString()).get("searchQuery") || "";
  const selectedItems = useAppSelector(
    (state: RootState) => state.movies.selectedItems
  );
  const flyoutVisible = useAppSelector(
    (state: RootState) => state.flyout.visible
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      dispatch(showFlyout());
    } else {
      dispatch(hideFlyout());
    }
  }, [selectedItems, dispatch]);

  const { data, isLoading } = useFetchMoviesQuery({
    query: searchQuery,
    page: currentPage,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCurrentPageData(data.results));
      dispatch(setTotal(data.total_pages > 20 ? 20 : data.total_pages));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setSearchParams({ frontPage: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [searchQuery, dispatch]);

  const handleClick = () => {
    if (id) {
      const currentParams = new URLSearchParams(searchParams.toString());
      navigate(`/?${currentParams.toString()}`);
    }
  };

  useEffect(() => {
    document.body.className = theme;

    return () => {
      document.body.className = "";
    };
  }, [theme]);

  return (
    <div className="container">
      <div className="right_side">
        <div className="wrapper_theme">
          <ThemeToggle />
        </div>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={(query) => setSearchParams({ searchQuery: query })}
        />
        {flyoutVisible && <Flyout />}

        <div onClick={handleClick}>
          {!isLoading ? (
            currentPageData.length > 0 ? (
              <List
                movies={currentPageData}
                page={currentPage}
                setPage={(page) => dispatch(setCurrentPage(page))}
                total={total}
              />
            ) : (
              <p>No movies found</p>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
