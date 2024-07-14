import { render } from "@testing-library/react";
import List from "./List.tsx";

const mockMovies = [
  {
    id: 1,
    original_title: "Movie 1",
    release_date: "2024-01-01",
    poster_path: "/poster1.jpg",
  },
  {
    id: 2,
    original_title: "Movie 2",
    release_date: "2024-02-01",
    poster_path: "/poster2.jpg",
  },
];

describe("List component", () => {
  it("renders the correct number of cards", () => {
    const { getAllByTestId } = render(
      <List movies={mockMovies} page={1} setPage={() => {}} total={1} />
    );

    const cards = getAllByTestId("movie-card");
    expect(cards.length).toBe(mockMovies.length);
  });

  it("displays a message when no movies are present", () => {
    const { getByText } = render(
      <List movies={[]} page={1} setPage={() => {}} total={0} />
    );

    const noMoviesMessage = getByText("No movies found");
    expect(noMoviesMessage).toBeInTheDocument();
  });
});
