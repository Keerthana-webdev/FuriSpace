import { useEffect, useState } from "react";

import ProductBanner from "../../components/product/ProductBanner";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import { getAllProducts } from "../../services/productService";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <ProductBanner />

      <section className="products-page">
        <div>
          <ProductSearch search={search} setSearch={setSearch} />

          <ProductSidebar />
        </div>

        <ProductGrid products={filteredProducts} loading={loading} />
      </section>
    </>
  );
}

export default Products;
