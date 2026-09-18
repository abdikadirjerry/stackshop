import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shippingCost = cartItems.length > 0 ? 10 : 0;
  const orderTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="section-container">
          <section className="cart-empty-state">
            <p className="section-label">YOUR CART</p>

            <h1>Your cart is empty.</h1>

            <p>
              You haven't added anything to your cart yet. Explore our products
              and find something you like.
            </p>

            <Link to="/products" className="cart-empty-button">
              Browse products
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="section-container">
        <div className="cart-header">
          <div>
            <p className="section-label">SHOPPING CART</p>
            <h1>Your cart</h1>
            <p>Review your items before continuing to checkout.</p>
          </div>

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

                <div className="cart-item-content">
                  <div className="cart-item-information">
                    <p>{item.category}</p>

                    <Link to={`/products/${item.id}`}>
                      <h2>{item.title}</h2>
                    </Link>

                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-control">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-stock">
                      {item.quantity >= item.stock
                        ? "Maximum stock reached"
                        : `${item.stock - item.quantity} available`}
                    </span>

                    <button
                      type="button"
                      className="remove-cart-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <div className="cart-summary-header">
              <h2>Order summary</h2>
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <strong>${shippingCost.toFixed(2)}</strong>
            </div>

            <div className="cart-summary-divider"></div>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>${orderTotal.toFixed(2)}</strong>
            </div>

            <Link to="/checkout" className="cart-checkout-button">
              Proceed to checkout
            </Link>

            <Link to="/products" className="continue-shopping-link">
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
