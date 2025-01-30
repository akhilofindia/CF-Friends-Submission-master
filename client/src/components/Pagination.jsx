import React from "react";

const Pagination = ({
  submissionsPerPage,
  totalSubmissions,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalSubmissions / submissionsPerPage);
  const maxPagesToShow = 3; // Maximum number of pages to display

  // Calculate the range of pages to display
  let startPage, endPage;
  if (totalPages <= maxPagesToShow) {
    // Display all pages if the total number of pages is less than or equal to the maximum
    startPage = 1;
    endPage = totalPages;
  } else {
    // Display a range of pages around the current page
    if (currentPage <= Math.floor(maxPagesToShow / 2)) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex gap-5 justify-center">
        {startPage > 1 && (
          <li>
            <button onClick={() => paginate(1)}>First</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button
              onClick={() => paginate(number)}
              style={{ fontWeight: currentPage === number ? "bold" : "normal" }}
            >
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <li>
            <button onClick={() => paginate(totalPages)}>Last</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
