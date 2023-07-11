export function reducer(state, action) {
  function itemIsPresent(arr) {
    return arr.some((arrItem) => {
      return arrItem.id === action.payload;
    });
  }
  console.log(action.payload);

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
      const filteredProducts = state.initialProduct.filter(
        (product) =>
          product.price >= state.minPrice && product.price <= action.payload
      );
      return {
        ...state,
        product: filteredProducts,
        maxPrice: action.payload,
      };

    default:
      return state;
  }
}
