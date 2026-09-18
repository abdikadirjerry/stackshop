import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");

        const productData = await getProductById(productId);

        setProduct(productData);
        setSelectedImage(productData.images?.[0] || productData.thumbnail);
        setQuantity(1);
      } catch (error) {
        setError("Unable to load this product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  function increaseQuantity() {
    if (product && quantity < product.stock) {
      setQuantity((currentQuantity) => currentQuantity + 1);
    }
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  function handleWishlistToggle() {
    toggleWishlist(product);
  }

  if (isLoading) {
    return (
      <main className="product-details-page">
        <div className="product-details-state">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="product-details-state error-state">
          <h1>Product not found.</h1>
          <p>{error || "This product is no longer available."}</p>

          <Link to="/products" className="back-to-products-button">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const productIsInWishlist = isInWishlist(product.id);
  const totalPrice = product.price * quantity;

  return (
    <main className="product-details-page">
      <div className="section-container">
        <Link to="/products" className="product-details-back-link">
          ← Back to products
        </Link>

        <section className="product-details">
          <div className="product-gallery">
            <div className="product-main-image">
              <img src={selectedImage} alt={product.title} />
            </div>

            <div className="product-thumbnails">
              {product.images?.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`product-thumbnail ${
                    selectedImage === image ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="product-information">
            <p className="product-category">{product.category}</p>

            <div className="product-title-row">
              <h1>{product.title}</h1>

              <button
                type="button"
                className={`product-wishlist-button ${
                  productIsInWishlist ? "active" : ""
                }`}
                onClick={handleWishlistToggle}
                aria-label={
                  productIsInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                aria-pressed={productIsInWishlist}
              >
                {productIsInWishlist ? "♥" : "♡"}
              </button>
            </div>

            <div className="product-rating">
              <span className="rating-stars">★</span>
              <strong>{product.rating.toFixed(1)}</strong>
              <span>Customer rating</span>
            </div>

            <div className="product-price">
              <strong>${product.price.toFixed(2)}</strong>

              {product.discountPercentage > 0 && (
                <span className="original-price">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}

              {product.discountPercentage > 0 && (
                <span className="discount-badge">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
              <div>
                <span>Brand</span>
                <strong>{product.brand || "StackShop"}</strong>
              </div>

              <div>
                <span>Availability</span>
                <strong>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>{product.shippingInformation}</strong>
              </div>
            </div>

            <div className="product-purchase">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to cart
              </button>
            </div>

            <div className="purchase-summary">
              <div>
                <span>Unit price</span>
                <strong>${product.price.toFixed(2)}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>{quantity}</strong>
              </div>

              <div className="purchase-total">
                <span>Total</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="product-extra-information">
          <div className="product-extra-card">
            <span className="product-extra-icon">✓</span>
            <div>
              <h3>Secure shopping</h3>
              <p>Your order information is protected.</p>
            </div>
          </div>

          <div className="product-extra-card">
            <span className="product-extra-icon">↗</span>
            <div>
              <h3>Fast delivery</h3>
              <p>{product.shippingInformation}</p>
            </div>
          </div>

          <div className="product-extra-card">
            <span className="product-extra-icon">↩</span>
            <div>
              <h3>Easy returns</h3>
              <p>{product.returnPolicy}</p>
            </div>
          </div>
        </section>

        <section className="product-specifications">
          <div className="product-specifications-header">
            <p className="section-label">PRODUCT INFORMATION</p>
            <h2>Specifications</h2>
          </div>

          <div className="specifications-grid">
            <div>
              <span>SKU</span>
              <strong>{product.sku}</strong>
            </div>

            <div>
              <span>Weight</span>
              <strong>{product.weight} g</strong>
            </div>

            <div>
              <span>Minimum order</span>
              <strong>{product.minimumOrderQuantity}</strong>
            </div>

            <div>
              <span>Warranty</span>
              <strong>{product.warrantyInformation}</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
