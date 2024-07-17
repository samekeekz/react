import "./Card.css";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  id: number;
  title?: string;
  releaseDate: string;
  poster: string;
};

const Card = ({ id, title, releaseDate, poster }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    navigate(`/${id}?${currentParams.toString()}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="group ">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className="card-image"
        />
        <div className="play-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-play-filled"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#5795F7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
              strokeWidth="0"
              fill="#5795F7"
            />
          </svg>
        </div>
      </div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        {releaseDate && (
          <div className="card-date">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-calendar-week"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
              <path d="M8 14v4" />
              <path d="M12 14v4" />
              <path d="M16 14v4" />
            </svg>
            {releaseDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
