import SectionContainer from "../common/SectionContainer";

const products = [
  {
    id: 1,
    name: "Minimal Wireless Headphones",
    category: "Audio",
    price: "$89.00",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Everyday Canvas Backpack",
    category: "Bags",
    price: "$64.00",
    badge: "New",
  },
  {
    id: 3,
    name: "Classic Everyday Watch",
    category: "Accessories",
    price: "$129.00",
    badge: "Featured",
  },
];

function FeaturedProducts() {
  return (
    <section className="featured-section" id="featured">
      <SectionContainer>
        <div className="section-heading">
          <div>
            <p className="section-label">FEATURED PRODUCTS</p>
            <h2>Made for everyday.</h2>
          </div>

          <a href="/products" className="section-link">
            Browse all →
          </a>
        </div>

        <div className="featured-grid">
          {products.map((product) => (
            <article className="featured-product" key={product.id}>
              <div className="product-image-placeholder">
                <span>{product.id}</span>
                <small>{product.badge}</small>
              </div>

              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>{product.price}</strong>

                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default FeaturedProducts;
