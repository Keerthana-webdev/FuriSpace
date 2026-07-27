import ProductBanner from "../../components/product/ProductBanner";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductGrid from "../../components/product/ProductGrid";

import "./Products.css";

function Products() {
  return (
    <>
      <ProductBanner />

      <section className="products-page">
        <ProductSidebar />

        <ProductGrid />
      </section>
    </>
  );
}

export default Products;
