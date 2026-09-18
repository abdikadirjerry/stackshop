import { createContext, useContext, useEffect, useState } from "react";

const CART_STORAGE_KEY = "stackshop-cart";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart.filter(
        (item) =>
          item &&
          typeof item.id === "number" &&
          typeof item.quantity === "number" &&
          item.quantity > 0 &&
          typeof item.price === "number",
      );
    } catch (error) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock,
        );

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        );
      }

      const safeQuantity = Math.min(quantity, product.stock);

      return [
        ...currentItems,
        {
          ...product,
          quantity: safeQuantity,
        },
      ];
    });

    setCartMessage(`${product.title} added to cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    cartMessage,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
