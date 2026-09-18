const WISHLIST_STORAGE_KEY = "stackshop-wishlist";

export function getStoredWishlist() {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!savedWishlist) {
      return [];
    }

    const parsedWishlist = JSON.parse(savedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      return [];
    }

    return parsedWishlist.filter(
      (item) =>
        item &&
        typeof item.id === "number" &&
        typeof item.price === "number" &&
        typeof item.title === "string",
    );
  } catch (error) {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    return [];
  }
}

export function saveWishlist(wishlistItems) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  } catch (error) {
    console.error("Unable to save wishlist:", error);
  }
}

export function clearStoredWishlist() {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear wishlist:", error);
  }
}
