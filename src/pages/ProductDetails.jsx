import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();

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

            <h1>{product.title}</h1>

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
                disabled={product.stock === 0}
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
