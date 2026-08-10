import { useEffect, useState } from "react";

import ProductBanner from "../../components/product/ProductBanner";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductSearch from "../../components/product/ProductSearch";
import ProductSort from "../../components/product/ProductSort";
import ProductGrid from "../../components/product/ProductGrid";
import { getAllProducts } from "../../services/productService";

import "./Products.css";

function Products() {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getAllProducts();

        setProducts(data.products || []);
      } catch (err) {
        console.error("Product Fetch Error:", err);

        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText);

    const matchesCategory =
      !selectedCategory ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesBrand =
      !selectedBrand ||
      product.brand?.toLowerCase() === selectedBrand.toLowerCase();

    const matchesMaterial =
      !selectedMaterial ||
      product.material?.toLowerCase() === selectedMaterial.toLowerCase();

    const matchesColor =
      !selectedColor ||
      product.color?.toLowerCase() === selectedColor.toLowerCase();

    const matchesPrice = Number(product.price || 0) <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesMaterial &&
      matchesColor &&
      matchesPrice
    );
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0),
      );

      break;

    case "price-high":
      sortedProducts.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0),
      );

      break;

    case "rating":
      sortedProducts.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0),
      );

      break;

    case "discount":
      sortedProducts.sort(
        (a, b) => Number(b.discount || 0) - Number(a.discount || 0),
      );

      break;

    case "newest":
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );

      break;

    case "name-asc":
      sortedProducts.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      break;

    case "name-desc":
      sortedProducts.sort((a, b) => (b.name || "").localeCompare(a.name || ""));

      break;

    default:
      break;
  }

  const clearFilters = () => {
    setSelectedCategory("");

    setSelectedBrand("");

    setSelectedMaterial("");

    setSelectedColor("");

    setMaxPrice(100000);

    setSearch("");

    setSortBy("");
  };

  return (
    <>
      <ProductBanner />

      <section className="products-page">

        <div className="products-sidebar">
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
            clearFilters={clearFilters}
          />
        </div>

        <div className="products-content">
          <ProductSearch search={search} setSearch={setSearch} />

          <ProductSort sortBy={sortBy} setSortBy={setSortBy} />

          <ProductGrid
            products={sortedProducts}
            loading={loading}
            error={error}
          />
        </div>
      </section>
    </>
  );
}

export default Products;
