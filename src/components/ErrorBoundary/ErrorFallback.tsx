import React from "react";
import "./ErrorFallback.css"; // Import your CSS file for styling

interface ErrorFallbackProps {
  onRetry: () => void; // Callback function to handle retry action
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ onRetry }) => {
  return (
    <div className="error-fallback">
      <div className="error-message">Oops! Something went wrong...</div>
      <div className="error-actions">
        <button onClick={onRetry}>Retry</button>
      </div>
    </div>
  );
};

export default ErrorFallback;
