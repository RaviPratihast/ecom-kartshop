# Kartshop

Kartshop is a React-based e-commerce frontend with:

- product listing and detail pages
- cart and wishlist management
- auth-gated flows for cart/wishlist
- responsive UI (desktop + mobile)
- modernized design system with reusable buttons/cards

---

## Quick Start

### 1) Clone and install

```bash
git clone https://github.com/RaviPratihast/ecom-kartshop.git
cd ecom-kartshop
npm install
```

### 2) Run locally

```bash
npm start
```

### 3) Production build

```bash
npm run build
```

---

## Tech Stack

- **Core:** React 18, React DOM 18
- **Routing:** `react-router-dom` v6
- **State Management:** React Context + `useReducer`
- **UI Styling:** plain CSS modules by feature/page (no CSS-in-JS)
- **Icons:** `lucide-react` (primary), `material-icons` font (legacy usage in some UI parts)
- **Notifications:** `react-toastify`
- **Tooling:** Create React App (`react-scripts`)

---

## Application Architecture

### Runtime Composition

`src/index.js` wraps the app in this order:

1. `BrowserRouter`
2. `ProductProvider` (catalog/cart/wishlist/filter state)
3. `AuthProvider` (login/session state)
4. `App`

### High-level Layers

- **Routing shell:** `src/App.js`
- **Domain state:** `src/context/*` + `src/reducers/*`
- **Reusable UI components:** `src/components/*`
- **Feature pages:** `src/pages/*`
- **Base styles:** `src/import.css` + page/component CSS files

---

## Project Structure

```text
src/
  App.js
  App.css
  index.js
  items.js
  requiresAuth.js
  context/
    ecom-context.js
    auth-context.js
  reducers/
    reducer.js
    authenticationReducer.js
  components/
    component-index.js
    button/
      button.jsx
      button.css
    card/
      card.jsx
      card.css
  pages/
    page-index.js
    home-page/
      home.jsx
      home.css
    shop-page/
      shop.jsx
      shop.css
    product-details-page/
      product-details.jsx
      product-details.css
    cart-page/
      cart.jsx
      cart.css
    wishlist-page/
      wishlist.jsx
      wishlist.css
    login-page/
      login.jsx
      login.css
    signIn-page/
      signIn.jsx
      signIn.css
```

---

## Routing & Navigation

Defined in `src/App.js`:

- `/` -> `Home`
- `/shop` -> `Shop`
- `/product/:productDetailsId` -> `ProductDetails`
- `/wishlist` -> protected (`RequiresAuth`)
- `/cart` -> protected (`RequiresAuth`)
- `/login` -> `Login`
- `/signIn` -> `SignIn`

### Protected Routes

`src/requiresAuth.js` checks `stateAuth.loggedIn`:

- if logged in -> render child route
- else -> redirect to `/login` and preserve previous location

---

## State Management Details

## 1) Product Context (`src/context/ecom-context.js`)

Holds commerce state:

- product source data (`initialProduct`)
- current rendered list (`product`)
- filter state (`maxPrice`, `filterRating`, flags)
- sorting (`sortOrder`)
- cart and wishlist collections

Uses `src/reducers/reducer.js`.

## 2) Auth Context (`src/context/auth-context.js`)

Holds auth state:

- `loggedIn`
- `isGuestUser`
- in-memory user list (`users`)

Uses `src/reducers/authenticationReducer.js`.

### Key reducer actions (commerce)

- `ADD_TO_CART`, `DECREMENT_QTY`, `REMOVE_FROM_CART`, `CLEAR_CART`
- `ADD_TO_WISHLIST`, `REMOVE_FROM_WISHLIST`, `REMOVE_ALL_FROM_WISHLIST`
- `HIGH_TO_LOW`, `LOW_TO_HIGH`
- `SET_RANGE`, `FILTER_BY_RATING`, `CLEAR_FILTERS`
- `SEARCH`, `RESET_SEARCH`

### Key reducer actions (auth)

- `USER_LOGGED_IN`
- `GUEST_USER_LOGGED_IN`
- `USER_LOGOUT`
- `SIGN_IN`

---

## Component Details

## `Button` (`src/components/button/button.jsx`)

Reusable button with style variants:

- `variant`: `primary`, `secondary`, `ghost`
- `size`: `sm`, `md`, `lg`
- accepts custom `className` for feature-specific styling

## `Card` (`src/components/card/card.jsx`)

Product preview card used in listing pages:

- image + title + rating
- price/original price/off label
- action slot via `children` (add-to-cart, wishlist button)

---

## Page Responsibilities

## Home (`src/pages/home-page/home.jsx`)

- storefront-style landing sections:
  - hero
  - category grid
  - featured products
- includes class naming conventions like `header-home`, `section-home-products`
  for easy inspection and targeting

## Shop (`src/pages/shop-page/shop.jsx`)

- filter/sort controls
- product grid rendering
- add to cart / wishlist actions
- mobile-specific filter toolbar + panels

## Product Details (`src/pages/product-details-page/product-details.jsx`)

- single product layout with media + details
- size selection UI
- cart/wishlist actions
- ratings/reviews and related items section

## Cart / Wishlist

- cart quantity and subtotal workflows
- wishlist add/remove and move between views

## Login / Sign Up

- responsive auth forms
- desktop split layout with visual panel
- mobile form-first layout

---

## Styling System

CSS organization:

- global imports: `src/import.css`
- base reset/colors/responsive helpers:
  - `src/reset.css`
  - `src/colors.css`
  - `src/responsive.css`
- feature/page CSS for scoped styling

### Current UI conventions

- touch target minimum around 44px for interactive controls
- consistent rounded corners and spacing rhythm
- class naming supports easier DOM targeting (example: `header-home-*`)

---

## Assets

- Static images/SVGs are stored in `public/image/*`
- Product catalog image references are defined in `src/items.js`

---

## Notes for Contributors

- This project currently uses in-memory auth/cart/wishlist state (no backend persistence).
- When adding UI sections, prefer explicit and searchable class names.
- When updating reducer behavior, avoid mutating state arrays in place.

---

## Available Scripts

- `npm start` - run dev server
- `npm run build` - production build
- `npm test` - run tests

