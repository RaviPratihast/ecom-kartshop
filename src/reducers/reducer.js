export function reducer(state, action) {
  function itemIsPresent(arr) {
    return arr.some((arrItem) => {
      return arrItem.id === action.payload;
    });
  }
  console.log(action.payload);
  console.log(state.filteredProduct);

  switch (action.type) {
    case "ADD_TO_CART":
      if (itemIsPresent(state.cart)) {
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            return cartItem.id === action.payload
              ? {
                  ...cartItem,
                  qty: cartItem.qty + 1,
                  totalProductPrice: (cartItem.qty + 1) * cartItem.price,
                }
              : cartItem;
          }),
        };
      }

      const productToBeAdded = state.product.find((product) => {
        return product.id === action.payload;
      });
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...productToBeAdded,
            qty: 1,
            totalProductPrice: 1 * productToBeAdded.price,
          },
        ],
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload && cartItem.qty > 1
            ? {
                ...cartItem,
                qty: cartItem.qty - 1,
                totalProductPrice: (cartItem.qty - 1) * cartItem.price,
              }
            : cartItem
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_TO_WISHLIST":
      const productToBeAddedToWishlist = state.product.find((product) => {
        return product.id === action.payload;
      });
      if (itemIsPresent(state.wishlist)) {
        return {
          ...state,
          wishlist: [...state.wishlist],
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, productToBeAddedToWishlist],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.id !== action.payload
        ),
      };
    // filters
    case "SET_RANGE":
      if (state.filterApplied) {
        console.log("if block for range");
        const filteredProductsCurr = state.filteredProduct.filter(
          (product) =>
            product.price >= state.minPrice && product.price <= action.payload
        );
        return {
          ...state,
          product: filteredProductsCurr,
          maxPrice: action.payload,
        };
      }
      const filteredProductsCurr = state.initialProduct.filter(
        (product) =>
          product.price >= state.minPrice && product.price <= action.payload
      );
      return {
        ...state,
        product: filteredProductsCurr,
        filteredProduct: filteredProductsCurr,
        // filterApplied: true,
        rangeFilterApplied: true,
        maxPrice: action.payload,
      };
    case "HIGH_TO_LOW":
      return {
        ...state,
        product: state.product.sort((a, b) => b.price - a.price),
      };
    case "LOW_TO_HIGH":
      return {
        ...state,
        product: state.product.sort((a, b) => a.price - b.price),
      };
    case "FILTER_BY_RATING":
      if (state.rangeFilterApplied) {
        console.log("if range");
        return {
          ...state,
          product: state.filteredProduct.filter(
            (product) => product.rating >= action.payload
          ),
        };
      }

      const ratingFilteredProduct = state.initialProduct.filter(
        (product) => product.rating >= action.payload
      );
      return {
        ...state,
        product: ratingFilteredProduct,
        filteredProduct: ratingFilteredProduct,
        ratingFilterApplied: true,
        filterRating: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        product: state.initialProduct.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "RESET_SEARCH":
      return {
        ...state,
        product: state.initialProduct,
      };

    default:
      return state;
  }
}
