import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          StackShop
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
            {wishlistCount > 0 && (
              <span className="navbar-wishlist-count">{wishlistCount}</span>
            )}
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link to="/products" className="navbar-search">
            Search
          </Link>

          <Link to="/cart" className="navbar-cart">
            Cart
            <span className="navbar-cart-count">{cartCount}</span>
          </Link>

          <button
            type="button"
            className="navbar-menu-button"
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
