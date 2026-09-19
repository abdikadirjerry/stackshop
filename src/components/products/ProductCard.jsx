import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const productIsInWishlist = isInWishlist(product.id);

  function handleAddToCart() {
    addToCart(product);
  }

  function handleWishlistToggle() {
    toggleWishlist(product);
  }

  return (
    <article className="product-card">
      <div className="product-card-image">
        <Link
          to={`/products/${product.id}`}
          className="product-card-image-link"
        >
          <img src={product.thumbnail} alt={product.title} />

          {product.discountPercentage > 10 && (
            <span className="product-card-badge">Sale</span>
          )}
        </Link>

        <button
          type="button"
          className={`product-card-wishlist ${
            productIsInWishlist ? "active" : ""
          }`}
          onClick={handleWishlistToggle}
          aria-label={
            productIsInWishlist
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={productIsInWishlist}
        >
          {productIsInWishlist ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-card-content">
        <p className="product-card-category">{product.category}</p>

        <Link
          to={`/products/${product.id}`}
          className="product-card-title-link"
        >
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
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
