import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Wishlist.css";

function Wishlist() {
  const { addToCart } = useCart();

  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  function handleAddToCart(product) {
    addToCart(product);
  }

  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page">
        <div className="section-container">
          <section className="wishlist-empty-state">
            <div className="wishlist-empty-icon">♡</div>

            <p className="section-label">YOUR WISHLIST</p>

            <h1>Your wishlist is empty.</h1>

            <p>
              Save products you love here so you can easily find them later.
            </p>

            <Link to="/products" className="wishlist-empty-button">
              Explore products
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <div className="section-container">
        <header className="wishlist-header">
          <div>
            <p className="section-label">YOUR WISHLIST</p>

            <h1>Saved products</h1>

            <p>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "product" : "products"} saved for
              later.
            </p>
          </div>

          <button
            type="button"
            className="wishlist-clear-button"
            onClick={clearWishlist}
          >
            Clear wishlist
          </button>
        </header>

        <section className="wishlist-grid">
          {wishlistItems.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="wishlist-card-image"
              >
                <img src={product.thumbnail} alt={product.title} />
              </Link>

              <div className="wishlist-card-content">
                <p className="wishlist-card-category">{product.category}</p>

                <Link to={`/products/${product.id}`}>
                  <h2>{product.title}</h2>
                </Link>

                <div className="wishlist-card-rating">
                  <span>★</span>
                  <span>{product.rating.toFixed(1)}</span>
                </div>

                <div className="wishlist-card-bottom">
                  <strong>${product.price.toFixed(2)}</strong>

                  <button
                    type="button"
                    className="wishlist-remove-button"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>

                <button
                  type="button"
                  className="wishlist-cart-button"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Out of stock" : "Add to cart"}
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Wishlist;
