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

    setWishlistMessage(`${product.title} added to wishlist.`);

    setTimeout(() => {
      setWishlistMessage("");
    }, 2500);
  }

  function removeFromWishlist(productId) {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setWishlistMessage(`${product.title} removed from wishlist.`);
    } else {
      addToWishlist(product);
    }

    setTimeout(() => {
      setWishlistMessage("");
    }, 2500);
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
