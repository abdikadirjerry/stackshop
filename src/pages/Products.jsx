import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../services/productService";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
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

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  filteredProducts = [...filteredProducts].sort(
    (firstProduct, secondProduct) => {
      if (sortOption === "price-low") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortOption === "price-high") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortOption === "rating") {
        return secondProduct.rating - firstProduct.rating;
      }

      if (sortOption === "name") {
        return firstProduct.title.localeCompare(secondProduct.title);
      }

      return 0;
    },
  );

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

          <div className="products-search">
            <label htmlFor="product-search">Search products</label>

            <input
              id="product-search"
              type="search"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="products-filters">
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-products">Sort by</label>

              <select
                id="sort-products"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option value="default">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="section-container">
          {!isLoading && !error && products.length > 0 && (
            <div className="products-results">
              <p>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>
          )}

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

          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="products-state">
              <h2>No products found.</h2>
              <p>Try changing your search or filters.</p>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => (
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
