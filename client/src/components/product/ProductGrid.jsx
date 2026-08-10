import ProductCard from "../home/ProductCard";

function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  if (error) {
    return <div className="loading error-message">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>No Products Found</h2>

        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="product-count">{products.length} Products Found</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
