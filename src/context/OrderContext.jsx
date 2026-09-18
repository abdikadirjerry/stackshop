import { createContext, useContext, useState } from "react";
import { getStoredOrder, saveOrder } from "../utils/orderStorage";

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [lastOrder, setLastOrder] = useState(() => getStoredOrder());

  function createOrder(orderData) {
    const order = {
      ...orderData,
      orderNumber: `SS-${Date.now().toString().slice(-8)}`,
      orderDate: new Date().toISOString(),
    };

    setLastOrder(order);
    saveOrder(order);

    return order;
  }

  const value = {
    lastOrder,
    createOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

export default OrderProvider;
