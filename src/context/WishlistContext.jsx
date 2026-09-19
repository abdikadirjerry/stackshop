import { createContext, useContext, useEffect, useState } from "react";
import {
  clearStoredWishlist,
  getStoredWishlist,
  saveWishlist,
} from "../utils/wishlistStorage";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => getStoredWishlist());

  const [wishlistMessage, setWishlistMessage] = useState("");

  useEffect(() => {
    saveWishlist(wishlistItems);
  }, [wishlistItems]);

  function showWishlistMessage(message) {
    setWishlistMessage(message);

    window.setTimeout(() => {
      setWishlistMessage("");
    }, 2500);
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  function addToWishlist(product) {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some((item) => item.id === product.id);

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });

    showWishlistMessage(`${product.title} added to wishlist.`);
  }

  function removeFromWishlist(productId) {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function toggleWishlist(product) {
    const alreadySaved = wishlistItems.some((item) => item.id === product.id);

    if (alreadySaved) {
      removeFromWishlist(product.id);
      showWishlistMessage(`${product.title} removed from wishlist.`);
      return;
    }

    addToWishlist(product);
  }

  function clearWishlist() {
    setWishlistItems([]);
    clearStoredWishlist();
  }

  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    wishlistMessage,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

export default WishlistProvider;
