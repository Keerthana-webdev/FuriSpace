function FilterSidebar() {
  return (
    <aside className="filter-sidebar">

      <h2>Filters</h2>

      <div className="filter-group">
        <h3>Category</h3>

        <label>
          <input type="checkbox" />
          Sofa
        </label>

        <label>
          <input type="checkbox" />
          Chair
        </label>

        <label>
          <input type="checkbox" />
          Bed
        </label>

        <label>
          <input type="checkbox" />
          Dining
        </label>
      </div>

      <div className="filter-group">
        <h3>Price</h3>

        <label>
          <input type="radio" name="price" />
          $0 - $500
        </label>

        <label>
          <input type="radio" name="price" />
          $500 - $1000
        </label>

        <label>
          <input type="radio" name="price" />
          Above $1000
        </label>
      </div>

    </aside>
  );
}

export default FilterSidebar;