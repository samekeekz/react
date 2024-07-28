import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MovieResponse {
  results: {
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: "movie";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
}

export interface SearchParams {
  query?: string;
  page: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTMyMjRlNmI4OGQzY2Y3OTZmNjJiNDA4Y2I1MjhkYiIsInN1YiI6IjY2MWJmMTEwYTRhZjhmMDE3YzM2ZmQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FdsWIE47QwDxR_g0fu87YukNqnQ7NGb_LAujf1fGyco`
      );
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMovies: builder.query<MovieResponse, SearchParams>({
      query: ({ query, page }) =>
        query
          ? `search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=${page}`
          : `trending/movie/day?language=en-US&page=${page}`,
    }),
  }),
});

export const { useFetchMoviesQuery } = apiSlice;
