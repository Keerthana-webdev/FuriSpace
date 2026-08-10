import { FiSearch, FiX } from "react-icons/fi";

import "./ProductSearch.css";

function ProductSearch({ search, setSearch }) {
  return (
    <div className="product-search">
      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search sofas, chairs, tables..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button className="clear-search" onClick={() => setSearch("")}>
          <FiX />
        </button>
      )}
    </div>
  );
}

export default ProductSearch;
