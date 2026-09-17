import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
