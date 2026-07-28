import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { getAllProducts } from "../../services/productService";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 className="loading">Loading Products...</h2>;

  return (
    <section className="featured-products">
      <div className="section-title">
        <h2>Featured Products</h2>

        <p>Discover our most popular premium furniture.</p>
      </div>

      <div className="products-grid">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
