import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import { getProducts } from "../../services/productService";
import "./ProductCard.css";
import "../common/StateStyles.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data.slice(0, 8));
    } catch (requestError) {
      setError("We couldn't load featured products right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="featured-products">
      <div className="section-container">
        <div className="featured-products-header">
          <div>
            <p className="section-label">FEATURED</p>

            <h2>Popular right now.</h2>
          </div>

          <Link to="/products" className="featured-products-link">
            View all products →
          </Link>
        </div>

        {loading && <LoadingState message="Loading featured products..." />}

        {!loading && error && (
          <ErrorState
            title="Featured products unavailable"
            message={error}
            onRetry={loadProducts}
          />
        )}

        {!loading && !error && products.length === 0 && (
          <ErrorState
            title="No featured products"
            message="There are currently no products available to display."
            onRetry={loadProducts}
          />
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
