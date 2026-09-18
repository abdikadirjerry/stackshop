const CART_STORAGE_KEY = "stackshop-cart";

export function getStoredCart() {
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
}

export function saveCart(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
}

export function clearStoredCart() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear stored cart:", error);
  }
}
