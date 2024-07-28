import React from "react";
import "./Pagination.css";

type PaginationProps = {
  page: number;
  total: number;
  onPrevious: (max: number) => void;
  onNext: (max: number) => void;
  onSelect: (page: number) => void;
  className?: string;
  itemClassName?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onPrevious,
  onNext,
  onSelect,
  className,
  itemClassName,
}) => {
  const totalPages = total;
  const pageNeighbors = 2;

  const handlePreviousClick = () => {
    if (page > 1) onPrevious(totalPages);
  };

  const handleNextClick = () => {
    if (page < totalPages) onNext(totalPages);
  };

  const handleSelectClick = (selectedPage: number) => {
    onSelect(selectedPage);
  };

  const generatePages = () => {
    const pages = [];
    const startPage = Math.max(2, page - pageNeighbors);
    const endPage = Math.min(totalPages - 1, page + pageNeighbors);

    pages.push(1);
    if (startPage > 2) pages.push(-1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push(-2);
    pages.push(totalPages);

    return pages;
  };

  if (totalPages === 1) return null;

  return (
    <nav
      aria-label="Page navigation example"
      className={`pagination-nav ${className}`}
    >
      <ul className="pagination-ul">
        <li className="pagination-li">
          <button
            type="button"
            disabled={page === 1}
            className={`pagination-button ${page === 1 ? "disabled" : ""}`}
            onClick={handlePreviousClick}
          >
            <span>Previous</span>
            &lt;
          </button>
        </li>
        {generatePages().map((p, index) => (
          <li key={index} className="pagination-li">
            {p > 0 ? (
              <button
                type="button"
                className={`pagination-button ${page === p ? "active" : ""} ${itemClassName}`}
                onClick={() => handleSelectClick(p)}
              >
                {p}
              </button>
            ) : (
              <span className="pagination-ellipsis">...</span>
            )}
          </li>
        ))}
        <li className="pagination-li">
          <button
            type="button"
            disabled={page === totalPages}
            className={`pagination-button ${page === totalPages ? "disabled" : ""}`}
            onClick={handleNextClick}
          >
            <span>Next</span>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
