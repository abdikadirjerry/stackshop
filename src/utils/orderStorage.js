const ORDER_STORAGE_KEY = "stackshop-last-order";

export function getStoredOrder() {
  try {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!savedOrder) {
      return null;
    }

    return JSON.parse(savedOrder);
  } catch (error) {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    return null;
  }
}

export function saveOrder(order) {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.error("Unable to save order:", error);
  }
}

export function clearStoredOrder() {
  try {
    localStorage.removeItem(ORDER_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear stored order:", error);
  }
}
