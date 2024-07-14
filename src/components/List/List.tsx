import Card from "../Card/Card.tsx";
import "./List.css";

export type Movies = {
  movies: Movie[];
};

export type Movie = {
  id: number;
  original_title: string;
  name?: string;
  release_date: string;
  poster_path: string;
};

const List = ({ movies }: Movies) => {
  return (
    <div className="grid-container">
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
  );
};

export default List;
