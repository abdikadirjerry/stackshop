import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="section-container">
          <div className="newsletter-content">
            <div>
              <p className="section-label">STAY IN THE LOOP</p>
              <h2>Get the latest from StackShop.</h2>
              <p>
                New products, special offers, and useful updates delivered to
                your inbox.
              </p>
            </div>

            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                Stack<span>Shop</span>
              </Link>

              <p>
                A modern shopping experience built with React and thoughtful
                design.
              </p>
            </div>

            <div className="footer-column">
              <h3>Shop</h3>
              <Link to="/products">All Products</Link>
              <Link to="/products">Categories</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/cart">Cart</Link>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <a href="/">About</a>
              <a href="/">Contact</a>
              <a href="/">Privacy</a>
              <a href="/">Terms</a>
            </div>

            <div className="footer-column">
              <h3>Follow</h3>
              <a href="/">Instagram</a>
              <a href="/">Twitter</a>
              <a href="/">Facebook</a>
              <a href="/">LinkedIn</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 StackShop. All rights reserved.</p>
            <p>Built with React.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
