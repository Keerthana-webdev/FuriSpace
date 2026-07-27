import FilterSidebar from "../../components/product/FilterSidebar";
import SortDropdown from "../../components/product/SortDropdown";
import ProductGrid from "../../components/product/ProductGrid";
import "./Products.css";

function Products() {
  return (
    <section className="products-page">
      <div className="products-header">
        <input
          type="text"
          placeholder="Search furniture..."
          className="search-input"
        />

        <SortDropdown />
      </div>

      <div className="products-container">
        <FilterSidebar />

        <ProductGrid />
      </div>
    </section>
  );
}

export default Products;
