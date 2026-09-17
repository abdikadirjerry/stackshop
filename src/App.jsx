import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";

function CartNotification() {
  const { cartMessage } = useCart();

  if (!cartMessage) {
    return null;
  }

  return <div className="cart-notification">{cartMessage}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <CartNotification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
