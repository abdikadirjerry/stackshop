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
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="section-container">
          <div className="cart-empty">
            <p className="cart-label">YOUR CART</p>
            <h1>Your cart is empty.</h1>
            <p>
              You haven't added any products to your cart yet. Explore our
              collection and find something you like.
            </p>

            <Link to="/products" className="cart-shop-button">
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="section-container">
        <div className="cart-header">
          <div>
            <p className="cart-label">YOUR CART</p>
            <h1>Shopping cart.</h1>
          </div>

          <p className="cart-item-count">
            {cartItems.length} {cartItems.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

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
                      aria-label={`Decrease ${item.title} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.title} quantity`}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <p>ORDER SUMMARY</p>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <strong>Free</strong>
            </div>

            <div className="cart-summary-divider"></div>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <button type="button" className="checkout-button">
              Proceed to checkout
            </button>

            <Link to="/products" className="continue-shopping-link">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
