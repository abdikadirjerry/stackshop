import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";
import WishlistProvider from "./context/WishlistContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
);
