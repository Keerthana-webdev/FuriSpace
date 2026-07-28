import ProductCard from "./ProductCard";

function ProductGrid({ products, loading }) {
  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
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
