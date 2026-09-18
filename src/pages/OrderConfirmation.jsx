import { Link, Navigate, useLocation } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const location = useLocation();
  const { lastOrder } = useOrder();

  const order = location.state?.order || lastOrder;

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const paymentLabel =
    order.paymentMethod === "card"
      ? "Credit or debit card"
      : "Cash on delivery";

  return (
    <main className="confirmation-page">
      <div className="section-container">
        <section className="confirmation-card">
          <div className="confirmation-icon">✓</div>

          <p className="section-label">ORDER CONFIRMED</p>

          <h1>Thank you for your order.</h1>

          <p className="confirmation-intro">
            Your order has been successfully placed. We've saved your order
            details below.
          </p>

          <div className="confirmation-order-meta">
            <div>
              <span>Order number</span>
              <strong>{order.orderNumber}</strong>
            </div>

            <div>
              <span>Order date</span>
              <strong>{formattedDate}</strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>{paymentLabel}</strong>
            </div>
          </div>

          <div className="confirmation-content">
            <section className="confirmation-section">
              <div className="confirmation-section-header">
                <h2>Items ordered</h2>
                <span>{order.items.length} products</span>
              </div>

              <div className="confirmation-items">
                {order.items.map((item) => (
                  <article className="confirmation-item" key={item.id}>
                    <div className="confirmation-item-image">
                      <img src={item.thumbnail} alt={item.title} />

                      <span>{item.quantity}</span>
                    </div>

                    <div className="confirmation-item-details">
                      <h3>{item.title}</h3>
                      <p>
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="confirmation-section">
              <div className="confirmation-section-header">
                <h2>Shipping details</h2>
              </div>

              <div className="confirmation-customer">
                <strong>
                  {order.customer.firstName} {order.customer.lastName}
                </strong>

                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.address}</p>
                <p>
                  {order.customer.city}, {order.customer.country}{" "}
                  {order.customer.postalCode}
                </p>
              </div>
            </section>

            <section className="confirmation-total-section">
              <div className="confirmation-total-row">
                <span>Subtotal</span>
                <strong>${order.subtotal.toFixed(2)}</strong>
              </div>

              <div className="confirmation-total-row">
                <span>Shipping</span>
                <strong>${order.shipping.toFixed(2)}</strong>
              </div>

              <div className="confirmation-total-divider"></div>

              <div className="confirmation-total-final">
                <span>Total paid</span>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            </section>
          </div>

          <div className="confirmation-actions">
            <Link to="/products" className="confirmation-primary-button">
              Continue shopping
            </Link>

            <Link to="/" className="confirmation-secondary-button">
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrderConfirmation;
