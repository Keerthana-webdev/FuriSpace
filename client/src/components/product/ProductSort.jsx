import { FiSliders } from "react-icons/fi";

import "./ProductSort.css";

function ProductSort({ sortBy, setSortBy }) {
  return (
    <div className="product-sort">
      <div className="sort-title">
        <FiSliders />

        <span>Sort By</span>
      </div>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="discount">Highest Discount</option>
        <option value="newest">Newest First</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>
  );
}

export default ProductSort;
