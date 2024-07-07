import { Component } from "react";
import List, { Movie } from "./components/List/List.tsx";
import "../src/index.css";
import Search from "./components/Search/Search.tsx";

class App extends Component {
  state = {
    loading: true,
    data: [] as Movie[],
  };

  setData = (data: Movie[]) => {
    this.setState({ data, loading: false });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
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
        console.error("Error:", response.statusText);
        return;
      }

      const dataFromServer = await response.json();
      this.setState({ data: dataFromServer.results, loading: false });
      console.log(dataFromServer);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="container">
        <Search setState={this.setData} fetchData={this.fetchData} />
        {!this.state.loading ? (
          <List movies={this.state.data} />
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
