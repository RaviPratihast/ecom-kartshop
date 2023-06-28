export function reducer(state, action) {
  function itemIsPresent(arr) {
    return arr.some((arrItem) => {
      return arrItem.id === action.payload;
    });
  }

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

    default:
      return state;
  }
}
