import "./ProductSort.css";

function ProductSort({ sortBy, setSortBy }) {
  return (
    <div className="product-sort">
      <label>Sort By</label>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Default</option>

        <option value="price-low">Price: Low to High</option>

        <option value="price-high">Price: High to Low</option>

        <option value="rating">Highest Rating</option>

        <option value="discount">Highest Discount</option>

        <option value="newest">Newest First</option>

        <option value="name-asc">Name A-Z</option>

        <option value="name-desc">Name Z-A</option>
      </select>
    </div>
  );
}

export default ProductSort;
