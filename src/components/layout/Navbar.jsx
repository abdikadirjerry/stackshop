import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Stack<span>Shop</span>
        </Link>

        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Wishlist
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link to="/products" className="navbar-search">
            Search
          </Link>

          <Link to="/cart" className="navbar-cart">
            Cart
            <span className="cart-count">0</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
