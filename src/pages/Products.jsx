import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";
import { getProducts } from "../services/productService";
import "./Products.css";
import "../components/common/StateStyles.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (requestError) {
      setError(
        "We couldn't load the products. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return uniqueCategories.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((firstProduct, secondProduct) => {
      if (sortOption === "price-low") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortOption === "price-high") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortOption === "rating") {
        return secondProduct.rating - firstProduct.rating;
      }

      return 0;
    });
  }, [products, searchTerm, selectedCategory, sortOption]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("default");
  }

  return (
    <main className="products-page">
      <div className="section-container">
        <div className="products-header">
          <div>
            <p className="section-label">OUR COLLECTION</p>

            <h1>Find something you love.</h1>

            <p>
              Explore our collection and discover products selected for everyday
              life.
            </p>
          </div>

          {!loading && !error && (
            <span className="products-count">
              {filteredProducts.length} products
            </span>
          )}
        </div>

        {!loading && !error && (
          <section className="products-filters">
            <div className="products-search">
              <label htmlFor="product-search">Search products</label>

              <input
                id="product-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by product or category..."
              />
            </div>

            <div className="products-filter-group">
              <label htmlFor="category-filter">Category</label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="all">All categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="products-filter-group">
              <label htmlFor="sort-products">Sort by</label>

              <select
                id="sort-products"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>

            {(searchTerm ||
              selectedCategory !== "all" ||
              sortOption !== "default") && (
              <button
                type="button"
                className="clear-filters-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </section>
        )}

        {loading && <LoadingState message="Loading products..." />}

        {!loading && error && (
          <ErrorState
            title="Products unavailable"
            message={error}
            onRetry={loadProducts}
          />
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState
            title="No products found."
            message="Try changing your search or filters to find what you're looking for."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <section className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Products;
