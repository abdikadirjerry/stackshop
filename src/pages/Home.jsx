import SectionContainer from "../components/common/SectionContainer";
import "./Home.css";

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
    </main>
  );
}

export default Home;
