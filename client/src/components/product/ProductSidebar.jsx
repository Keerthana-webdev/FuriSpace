import "./ProductSidebar.css";

function ProductSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedMaterial,
  setSelectedMaterial,
  selectedColor,
  setSelectedColor,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <aside className="sidebar">
      <h2>Filters</h2>

      <div className="filter-group">
        <h4>Category</h4>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          <option>Sofa</option>
          <option>Chair</option>
          <option>Bed</option>
          <option>Table</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Brand</h4>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All</option>
          <option>IKEA</option>
          <option>Urban Ladder</option>
          <option>WoodCraft</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Material</h4>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="">All</option>
          <option>Wood</option>
          <option>Metal</option>
          <option>Leather</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Color</h4>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">All</option>
          <option>Brown</option>
          <option>Black</option>
          <option>White</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Max Price: ₹{maxPrice}</h4>

        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <button
        className="clear-btn"
        onClick={() => {
          setSelectedCategory("");
          setSelectedBrand("");
          setSelectedMaterial("");
          setSelectedColor("");
          setMaxPrice(100000);
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
}

export default ProductSidebar;
