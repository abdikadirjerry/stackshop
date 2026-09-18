import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";
import "../components/common/StateStyles.css";

function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProduct() {
    try {
      setLoading(true);
      setError("");

      const data = await getProductById(productId);

      setProduct(data);
      setQuantity(1);
    } catch (requestError) {
      setProduct(null);
      setError(
        "We couldn't find this product. It may have been removed or the link may be incorrect.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="section-container">
          <LoadingState message="Loading product..." />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="section-container">
          <ErrorState
            title="Product not found"
            message={error || "The product you're looking for is unavailable."}
            onRetry={loadProduct}
          />

          <div className="product-details-back">
            <Link to="/products">← Back to products</Link>
          </div>
        </div>
      </main>
    );
  }

  const maxQuantity = product.stock;
  const wishlistActive = isInWishlist(product.id);

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(currentQuantity + 1, maxQuantity),
    );
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  return (
    <main className="product-details-page">
      <div className="section-container">
        <Link to="/products" className="product-details-back-link">
          ← Back to products
        </Link>

        <section className="product-details-layout">
          <div className="product-details-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="product-details-content">
            <div className="product-details-category">{product.category}</div>

            <div className="product-details-title-row">
              <h1>{product.title}</h1>

              <button
                type="button"
                className={`product-details-wishlist ${
                  wishlistActive ? "active" : ""
                }`}
                onClick={() => toggleWishlist(product)}
                aria-label={
                  wishlistActive ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {wishlistActive ? "♥" : "♡"}
              </button>
            </div>

            <div className="product-details-rating">
              <span>★</span>
              <strong>{product.rating.toFixed(1)}</strong>
              <span>Product rating</span>
            </div>

            <p className="product-details-description">{product.description}</p>

            <div className="product-details-price">
              ${product.price.toFixed(2)}
            </div>

            <div className="product-details-stock">
              {product.stock > 0
                ? `${product.stock} available in stock`
                : "Out of stock"}
            </div>

            {product.stock > 0 && (
              <div className="product-details-actions">
                <div className="product-details-quantity">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= maxQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="product-details-cart-button"
                  onClick={handleAddToCart}
                >
                  Add {quantity} to cart
                </button>
              </div>
            )}

            <div className="product-details-information">
              <div>
                <span>Brand</span>
                <strong>{product.brand || "StackShop"}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Discount</span>
                <strong>{product.discountPercentage}%</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
