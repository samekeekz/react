import Card from "../Card/Card.tsx";
import "./List.css";
import Pagination from "../Pagination/Pagination.tsx";
import { useEffect, useRef } from "react";
import { Movie } from "../../store/slices/movieSlice.ts";

type Props = {
  movies: Movie[];
  page: number;
  setPage: (page: number) => void;
  total: number;
};

const List = ({ movies, page, setPage, total }: Props) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const updateColumns = () => {
      const gridContainer = gridContainerRef.current;
      if (gridContainer) {
        const width = gridContainer.offsetWidth;

        if (width >= 1024) {
          gridContainer.setAttribute("data-columns", "6");
        } else if (width >= 768) {
          gridContainer.setAttribute("data-columns", "5");
        } else if (width >= 640) {
          gridContainer.setAttribute("data-columns", "4");
        } else {
          gridContainer.setAttribute("data-columns", "1");
        }
      }
    };

    updateColumns();
  }, [gridContainerRef.current?.offsetWidth]);

  return (
    <div>
      <div className="grid-container" ref={gridContainerRef}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <Card
              id={movie.id}
              key={movie.id}
              title={movie.original_title || movie.name}
              releaseDate={movie.release_date}
              poster={movie.poster_path}
            />
          ))}
      </div>
      <Pagination
        page={page}
        total={total}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSelect={setPage}
      />
    </div>
  );
};

export default List;
