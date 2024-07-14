import Loader from "../Loader/Loader.tsx";

interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieDetailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

import { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";

const Details = () => {
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMovie(null);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTMyMjRlNmI4OGQzY2Y3OTZmNjJiNDA4Y2I1MjhkYiIsInN1YiI6IjY2MWJmMTEwYTRhZjhmMDE3YzM2ZmQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FdsWIE47QwDxR_g0fu87YukNqnQ7NGb_LAujf1fGyco",
            },
          }
        );

        console.log("1");

        if (!response.ok) {
          console.error("Error:", response.statusText);
          return;
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <section className="movie-details">
      {movie ? (
        <div className="movie-details__content">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="movie-details__backdrop"
          />
          <div className="movie-details__info">
            <aside className="movie-details__poster">
              <div className="movie-details__poster-cover">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-details__poster-image"
                />
              </div>
            </aside>
            <div className="movie-details__text">
              <h1 className="movie-details__title">
                {movie.belongs_to_collection?.name}
              </h1>
              <div className="movie-details__status">
                <span className="movie-details__imdb">
                  <i className="fa-solid fa-star"></i> {movie.vote_average}
                </span>
                <span>{movie.runtime} min</span>
              </div>
              <p className="movie-details__overview">{movie.overview}</p>
              <div className="movie-details__meta">
                <div>
                  <div className="movie-details__meta-title">Genre:</div>
                  <span>
                    {movie.genres.map(({ id, name }) => (
                      <a
                        href={`/genre/${id}`}
                        className="movie-details__meta-link"
                        key={id}
                        title={`${name} Movies, TV-Shows`}
                      >
                        {name}
                      </a>
                    ))}
                  </span>
                </div>
                <div>
                  <div className="movie-details__meta-title">Release:</div>
                  <span>{movie.release_date}</span>
                </div>
                <div>
                  <div className="movie-details__meta-title">Production:</div>
                  <span>
                    {movie.production_companies.map(({ id, name }) => (
                      <a
                        href={`/company/${id}`}
                        className="movie-details__meta-link"
                        key={id}
                        title={`${name} Movies, TV-Shows`}
                      >
                        {name}
                      </a>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Details;
