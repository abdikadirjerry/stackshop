import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function CartNotification() {
  const { cartMessage } = useCart();

  if (!cartMessage) {
    return null;
  }

  return <div className="cart-notification">{cartMessage}</div>;
}

function WishlistNotification() {
  const { wishlistMessage } = useWishlist();

  if (!wishlistMessage) {
    return null;
  }

  return <div className="wishlist-notification">{wishlistMessage}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <CartNotification />

        <WishlistNotification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
