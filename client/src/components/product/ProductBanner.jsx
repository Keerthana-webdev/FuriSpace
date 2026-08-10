import "./ProductBanner.css";

function ProductBanner() {
  return (
    <section className="product-banner">
      <div className="product-banner-overlay">
        <div className="product-banner-content">
          <p className="banner-small-text">FURNISPACE COLLECTION</p>

          <h1>
            Premium Furniture
            <br />
            For Modern Living
          </h1>

          <p>
            Discover beautifully crafted furniture designed to make your home
            comfortable and stylish.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductBanner;
