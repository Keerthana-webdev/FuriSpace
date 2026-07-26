import { Link } from "react-router-dom";

function ProductCard({ product }) {
  console.log(product.images);
  console.log(product.images[0]);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images?.[0]?.url} alt={product.name} />

        {product.discount > 0 && (
          <span className="discount">{product.discount}% OFF</span>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="rating">⭐ {product.rating || 4.5}</p>

        <h2>₹{product.price.toLocaleString()}</h2>

        <div className="buttons">
          <button>Add To Cart</button>

          <Link to={`/products/${product._id}`}>View</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
