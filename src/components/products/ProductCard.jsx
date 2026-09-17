import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-image-link">
        <div className="product-card-image">
          <img src={product.thumbnail} alt={product.title} />

          {product.discountPercentage > 10 && (
            <span className="product-card-badge">Sale</span>
          )}
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-card-category">{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-title">{product.title}</h3>
        </Link>

        <div className="product-card-rating">
          <span>★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>

        <div className="product-card-bottom">
          <div className="product-card-price">
            <strong>${product.price.toFixed(2)}</strong>

            {product.discountPercentage > 0 && (
              <span>
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="product-card-cart-button"
            aria-label={`Add ${product.title} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
