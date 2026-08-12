import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./ProductPagination.css";

function ProductPagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-pagination">
      <button
        className="pagination-arrow"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={
                currentPage === page ? "page-number active" : "page-number"
              }
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className="pagination-arrow"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default ProductPagination;
