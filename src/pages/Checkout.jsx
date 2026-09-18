import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();

  const [formData, setFormData] = useState(initialFormData);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

  const shippingCost = 10;
  const orderTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    navigate("/order-confirmation", {
      state: {
        customer: formData,
        paymentMethod,
        items: cartItems,
        subtotal: cartTotal,
        shipping: shippingCost,
        total: orderTotal,
      },
    });
  }

  return (
    <main className="checkout-page">
      <div className="section-container">
        <div className="checkout-header">
          <Link to="/cart" className="checkout-back-link">
            ← Back to cart
          </Link>

          <p className="section-label">SECURE CHECKOUT</p>

          <h1>Complete your order.</h1>

          <p>
            Enter your information and choose your preferred payment method.
          </p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>01</span>

                <div>
                  <h2>Contact information</h2>
                  <p>How can we contact you about your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field">
                  <label htmlFor="firstName">First name</label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />

                  {errors.firstName && (
                    <span className="checkout-error">{errors.firstName}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="lastName">Last name</label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />

                  {errors.lastName && (
                    <span className="checkout-error">{errors.lastName}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">Email address</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <span className="checkout-error">{errors.email}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone number</label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+252 ..."
                  />

                  {errors.phone && (
                    <span className="checkout-error">{errors.phone}</span>
                  )}
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>02</span>

                <div>
                  <h2>Shipping address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field checkout-field-full">
                  <label htmlFor="address">Street address</label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />

                  {errors.address && (
                    <span className="checkout-error">{errors.address}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">City</label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />

                  {errors.city && (
                    <span className="checkout-error">{errors.city}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="country">Country</label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />

                  {errors.country && (
                    <span className="checkout-error">{errors.country}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal code</label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />

                  {errors.postalCode && (
                    <span className="checkout-error">{errors.postalCode}</span>
                  )}
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading">
                <span>03</span>

                <div>
                  <h2>Payment method</h2>
                  <p>Select how you want to pay.</p>
                </div>
              </div>

              <div className="payment-methods">
                <label
                  className={`payment-option ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <strong>Credit or debit card</strong>
                    <span>Visa, Mastercard and other cards</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "cash" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <strong>Cash on delivery</strong>
                    <span>Pay when your order arrives</span>
                  </div>
                </label>
              </div>
            </section>

            <button type="submit" className="checkout-submit-button">
              Place order · ${orderTotal.toFixed(2)}
            </button>
          </div>

          <aside className="checkout-summary">
            <div className="checkout-summary-header">
              <p className="section-label">ORDER SUMMARY</p>
              <h2>Your order</h2>
            </div>

            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <div className="checkout-summary-image">
                    <img src={item.thumbnail} alt={item.title} />

                    <span>{item.quantity}</span>
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider"></div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <strong>${shippingCost.toFixed(2)}</strong>
            </div>

            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>${orderTotal.toFixed(2)}</strong>
            </div>

            <div className="checkout-security">
              <span>✓</span>
              <p>Your information is handled securely.</p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
