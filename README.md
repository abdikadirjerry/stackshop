# StackShop

A modern, responsive e-commerce web application built with React and Vite.

StackShop provides a complete shopping experience including product browsing, search, filtering, sorting, product details, wishlist management, shopping cart functionality, checkout, and order confirmation.

## Features

- Responsive navigation
- Product browsing
- Product search
- Product category filtering
- Product sorting
- Product details
- Add to cart
- Cart quantity management
- Stock limit protection
- Cart persistence with localStorage
- Wishlist functionality
- Wishlist persistence with localStorage
- Checkout form
- Customer and shipping information
- Payment method selection
- Order summary
- Order confirmation
- Loading states
- Error states
- Empty states
- Responsive design
- Reusable React components
- Context API for cart and wishlist state
- Product data from DummyJSON API

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- CSS
- Context API
- LocalStorage
- DummyJSON API
- Git
- GitHub

## Project Structure

```text
stackshop/
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── products/
│   │   └── cart/
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── data/
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderConfirmation.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── utils/
│   │   ├── cartStorage.js
│   │   ├── wishlistStorage.js
│   │   ├── storeConstants.js
│   │   └── formatCurrency.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:abdikadirjerry/stackshop.git
```

### 2. Enter the project

```bash
cd stackshop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal.

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## API

StackShop uses the DummyJSON Products API to retrieve product information.

The application does not require an API key.

Product data is requested through the product service located at:

```text
src/services/productService.js
```

## Application Routes

| Route                  | Description     |
| ---------------------- | --------------- |
| `/`                    | Homepage        |
| `/products`            | Product catalog |
| `/products/:productId` | Product details |
| `/wishlist`            | Saved products  |
| `/cart`                | Shopping cart   |
| `/checkout`            | Checkout        |
| `/order-confirmation`  | Completed order |

## State Management

StackShop uses React Context API for global shopping state.

### Cart Context

The cart context manages:

- Cart products
- Product quantities
- Cart item count
- Cart total
- Adding products
- Removing products
- Increasing quantities
- Decreasing quantities
- Clearing the cart
- Cart notifications

### Wishlist Context

The wishlist context manages:

- Wishlist products
- Wishlist count
- Adding products
- Removing products
- Toggling wishlist status
- Clearing the wishlist
- Wishlist notifications

## Data Persistence

Cart and wishlist data are stored in the browser using `localStorage`.

Storage utilities are located in:

```text
src/utils/cartStorage.js
src/utils/wishlistStorage.js
```

Store-related constants are centralized in:

```text
src/utils/storeConstants.js
```

## Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive layouts are implemented using CSS media queries.

## Main User Flow

```text
Homepage
   ↓
Products
   ↓
Product Details
   ↓
Add to Cart
   ↓
Cart
   ↓
Checkout
   ↓
Order Confirmation
```

Users can also save products through the wishlist:

```text
Products
   ↓
Wishlist
   ↓
Add to Cart
   ↓
Cart
```

## Production Build

Create a production build with:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

## Future Improvements

Possible future improvements include:

- User authentication
- Backend API
- PostgreSQL database
- Real payment integration
- User accounts
- Order history
- Product reviews
- Advanced product filtering
- Admin dashboard
- Inventory management
- Backend order management
- Automated testing
- CI/CD
- Production deployment

## Project Status

### Completed

- Project setup
- Responsive navigation
- Homepage
- Product catalog
- Product search
- Product filtering
- Product sorting
- Product details
- Shopping cart
- Cart persistence
- Wishlist
- Wishlist persistence
- Checkout
- Order confirmation
- Loading and error states
- Responsive UI
- Code refactoring
- Project documentation

### Upcoming

- GitHub finalization
- Production deployment
- Final portfolio review

## Author

**Abdikadir Jerry**

GitHub:

```text
https://github.com/abdikadirjerry
```
