import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
);
