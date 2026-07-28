import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/productService";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        setProducts(data.products);
      } catch (err) {
        console.error(err);

        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  if (error) {
    return <h2 className="loading">{error}</h2>;
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
