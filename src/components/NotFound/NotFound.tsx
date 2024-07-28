import React from "react";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <a href="/" className="back-home-link">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
