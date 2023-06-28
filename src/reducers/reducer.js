export function reducer(state, action) {
  // this function will test the item present in the array.
  // console.log("hello");
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
        cart: [...state.cart, { ...productToBeAdded, qty: 1 }],
        // subTotalOfCart: state.cart.reduce((acc, curr) => acc + curr.totalItemPrice, 0),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    // case "HIGH_TO_LOW":
    //   const sortedHighToLow = [...state.product].sort(
    //     (a, b) => b.price - a.price
    //   );
    //   return {
    //     ...state,
    //     product: sortedHighToLow,
    //   };
    default:
      return state;
  }
  // console.log(state.cart);
}
