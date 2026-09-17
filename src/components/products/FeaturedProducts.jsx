import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionContainer from "../common/SectionContainer";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const productData = await getProducts();

        setProducts(productData.slice(0, 4));
      } catch (error) {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <section className="featured-section" id="featured">
      <SectionContainer>
        <div className="section-heading">
          <div>
            <p className="section-label">FEATURED PRODUCTS</p>
            <h2>Made for everyday.</h2>
          </div>

          <Link to="/products" className="section-link">
            Browse all →
          </Link>
        </div>

        {isLoading && (
          <div className="featured-loading">
            <p>Loading featured products...</p>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="featured-products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="featured-loading">
            <p>Featured products are currently unavailable.</p>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}

export default FeaturedProducts;
