import { useEffect, useState } from "react";

import ProductBanner from "../../components/product/ProductBanner";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import ProductSort from "../../components/product/ProductSort";

import { getAllProducts } from "../../services/productService";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

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

    const matchesSearch =
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;

    const matchesBrand =
      selectedBrand === "" ||
      product.brand === selectedBrand;

    const matchesMaterial =
      selectedMaterial === "" ||
      product.material === selectedMaterial;

    const matchesColor =
      selectedColor === "" ||
      product.color === selectedColor;

    const matchesPrice =
      product.price <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesMaterial &&
      matchesColor &&
      matchesPrice
    );
  });

  return (
    <>
      <ProductBanner />

      <section className="products-page">
        <div>
          <ProductSearch
            search={search}
            setSearch={setSearch}
          />

          <ProductSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <ProductGrid
          products={filteredProducts}
          loading={loading}
        />
      </section>
    </>
  );
}

export default Products;