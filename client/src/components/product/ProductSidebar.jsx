import "./ProductSidebar.css";

function ProductSidebar() {
  return (
    <aside className="sidebar">
      <h2>Filters</h2>

      <div className="filter-group">
        <h4>Category</h4>

        <label>
          <input type="checkbox" /> Sofa
        </label>

        <label>
          <input type="checkbox" /> Chair
        </label>

        <label>
          <input type="checkbox" /> Bed
        </label>
      </div>

      <div className="filter-group">
        <h4>Material</h4>

        <label>
          <input type="checkbox" /> Wood
        </label>

        <label>
          <input type="checkbox" /> Metal
        </label>

        <label>
          <input type="checkbox" /> Leather
        </label>
      </div>
    </aside>
  );
}

export default ProductSidebar;
