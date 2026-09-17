import SectionContainer from "../components/common/SectionContainer";
import "./Home.css";

const categories = [
  {
    name: "Electronics",
    description: "Smart devices and modern technology.",
    icon: "01",
  },
  {
    name: "Fashion",
    description: "Everyday essentials and new styles.",
    icon: "02",
  },
  {
    name: "Home & Living",
    description: "Products for a better home.",
    icon: "03",
  },
  {
    name: "Accessories",
    description: "The finishing touches that matter.",
    icon: "04",
  },
];

function Home() {
  return (
    <main className="home">
      <section className="hero-section">
        <SectionContainer>
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-label">NEW SEASON COLLECTION</p>

              <h1 className="hero-title">
                Everything you need.
                <span> All in one place.</span>
              </h1>

              <p className="hero-description">
                Discover carefully selected products designed to make your
                everyday life better.
              </p>

              <div className="hero-actions">
                <a href="/products" className="hero-primary-button">
                  Shop now
                </a>

                <a href="#featured" className="hero-secondary-button">
                  Explore collection
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-badge">Featured</div>

                <div className="hero-card-image">
                  <span>SS</span>
                </div>

                <div className="hero-card-content">
                  <p>StackShop Collection</p>
                  <strong>Discover something new</strong>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="categories-section">
        <SectionContainer>
          <div className="section-heading">
            <div>
              <p className="section-label">SHOP BY CATEGORY</p>
              <h2>Find what fits your lifestyle.</h2>
            </div>

            <a href="/products" className="section-link">
              View all products →
            </a>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <a
                href="/products"
                className="category-card"
                key={category.name}
              >
                <span className="category-number">{category.icon}</span>

                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>

                <span className="category-arrow">↗</span>
              </a>
            ))}
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}

export default Home;