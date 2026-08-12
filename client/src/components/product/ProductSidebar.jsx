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

  clearFilters,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>

        <button onClick={clearFilters}>Clear All</button>
      </div>

      {/* CATEGORY */}

      <div className="filter-group">
        <h4>Category</h4>

        <label>
          <input
            type="radio"
            name="category"
            value="Sofa"
            checked={selectedCategory === "Sofa"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          Sofa
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Chair"
            checked={selectedCategory === "Chair"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          Chair
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Table"
            checked={selectedCategory === "Table"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          Table
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="Bed"
            checked={selectedCategory === "Bed"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          Bed
        </label>
      </div>

      {/* BRAND */}

      <div className="filter-group">
        <h4>Brand</h4>

        <label>
          <input
            type="radio"
            name="brand"
            value="IKEA"
            checked={selectedBrand === "IKEA"}
            onChange={(e) => setSelectedBrand(e.target.value)}
          />
          IKEA
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Urban Ladder"
            checked={selectedBrand === "Urban Ladder"}
            onChange={(e) => setSelectedBrand(e.target.value)}
          />
          Urban Ladder
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="WoodCraft"
            checked={selectedBrand === "WoodCraft"}
            onChange={(e) => setSelectedBrand(e.target.value)}
          />
          WoodCraft
        </label>
      </div>

      {/* MATERIAL */}

      <div className="filter-group">
        <h4>Material</h4>

        <label>
          <input
            type="radio"
            name="material"
            value="Wood"
            checked={selectedMaterial === "Wood"}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          />
          Wood
        </label>

        <label>
          <input
            type="radio"
            name="material"
            value="Metal"
            checked={selectedMaterial === "Metal"}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          />
          Metal
        </label>

        <label>
          <input
            type="radio"
            name="material"
            value="Leather"
            checked={selectedMaterial === "Leather"}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          />
          Leather
        </label>
      </div>

      {/* COLOR */}

      <div className="filter-group">
        <h4>Color</h4>

        <label>
          <input
            type="radio"
            name="color"
            value="Brown"
            checked={selectedColor === "Brown"}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          Brown
        </label>

        <label>
          <input
            type="radio"
            name="color"
            value="Black"
            checked={selectedColor === "Black"}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          Black
        </label>

        <label>
          <input
            type="radio"
            name="color"
            value="White"
            checked={selectedColor === "White"}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          White
        </label>
      </div>

      {/* PRICE */}

      <div className="filter-group">
        <h4>Maximum Price</h4>

        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <div className="price-range">
          <span>₹0</span>

          <strong>₹{(maxPrice || 0).toLocaleString()}</strong>
        </div>
      </div>
    </aside>
  );
}

export default ProductSidebar;
