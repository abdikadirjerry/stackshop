import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../services/productService";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const productData = await getProducts();

        setProducts(productData);
      } catch (error) {
        setError("Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="products-page">
      <section className="products-header">
        <div className="section-container">
          <p className="products-label">STACKSHOP STORE</p>

          <h1>Explore our products.</h1>

          <p>
            Browse our collection and discover products selected for everyday
            life.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="section-container">
          {isLoading && (
            <div className="products-state">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="products-state error-state">
              <h2>Something went wrong.</h2>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="products-state">
              <h2>No products found.</h2>
              <p>There are currently no products available.</p>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Products;
