import PropTypes from "prop-types";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Generate by ChatGPT 3.5 with prompt: "Generate a nice pgination jsx with bootstrap style 
  // from https://getbootstrap.com/docs/5.3/components/pagination/#disabled-and-active-states"
  return (
    <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {pageNumbers.map(page => (
        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
