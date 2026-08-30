import { useEffect, useState } from "react";

import ProductBanner from "../../components/product/ProductBanner";
import ProductSidebar from "../../components/product/ProductSidebar";
import ProductSearch from "../../components/product/ProductSearch";
import ProductSort from "../../components/product/ProductSort";
import ProductGrid from "../../components/product/ProductGrid";
import ProductPagination from "../../components/product/ProductPagination";

import { getAllProducts } from "../../services/productService";

import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Products displayed on one page
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText)
    );
  });

  const sortedProducts = [...filteredProducts];

  switch (sortOption) {
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

    case "newest":
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
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

    default:
      // Featured
      break;
  }

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // -----------------------------
  // RETURN UI
  // -----------------------------

  return (
    <>
      <ProductBanner />

      <section className="products-page">
        {/* LEFT SIDE */}

        <div>
          <ProductSearch
            search={search}
            setSearch={(value) => {
              setSearch(value);

              // Reset pagination
              setCurrentPage(1);
            }}
          />

          <ProductSidebar />
        </div>

        {/* RIGHT SIDE */}

        <div>
          {/* SORT */}

          <ProductSort
            sortOption={sortOption}
            setSortOption={(value) => {
              setSortOption(value);

              // Reset pagination
              setCurrentPage(1);
            }}
          />

          {/* PRODUCTS */}

          <ProductGrid products={paginatedProducts} loading={loading} />

          {/* PAGINATION */}

          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}

export default Products;
