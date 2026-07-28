import { FiSearch } from "react-icons/fi";
import "./ProductSearch.css";

function ProductSearch({ search, setSearch }) {
  return (
    <div className="product-search">
      <FiSearch />

      <input
        type="text"
        placeholder="Search furniture..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && <button onClick={() => setSearch("")}>Clear</button>}
    </div>
  );
}

export default ProductSearch;
