export function reducer(state, action) {
  // this function will test the item present in the array.
  function itemIsPresent(arr) {
    return arr.some((arrItem) => {
      return arrItem.id === action.payload.id;
    });
  }

  switch (action.type) {
    case "ADD_TO_CART":
      if (itemIsPresent(state.cart)) {
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            return cartItem.id === action.payload.id
              ? {
                  ...cartItem,
                  qty: cartItem.qty + action.payload.qty,
                }
              : cartItem;
          }),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
        // subTotalOfCart: state.cart.reduce((acc, curr) => acc + curr.totalItemPrice, 0),
      };

    case "ADD_TO_WISHLIST":
      console.log("wish", action.payload);
      if (itemIsPresent(state.wishlist)) {
        return {
          ...state,
          wishlist: [...state.wishlist],
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          return cartItem.id === action.payload.id
            ? {
                ...cartItem,
                qty: cartItem.qty + 1,
                totalItemPrice: action.payload.price * (cartItem.qty + 1),
              }
            : cartItem;
        }),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload.id && cartItem.qty > 1
            ? {
                ...cartItem,
                qty: cartItem.qty - 1,
                totalItemPrice: cartItem.totalItemPrice - action.payload.price,
              }
            : cartItem
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "HIGH_TO_LOW":
      const sortedHighToLow = [...state.product].sort(
        (a, b) => b.price - a.price
      );

      return {
        ...state,
        product: sortedHighToLow,
      };
    case "LOW_TO_HIGH":
      // console.log("low to high", state.product);
      const sortedLowToHigh = [...state.product].sort(
        (a, b) => a.price - b.price
      );

      return {
        ...state,
        product: sortedLowToHigh,
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        product: state.initialProduct,
        maxPrice: 6000,
        filterRating: 0,
      };
    case "SET_PRICE_RANGE":
      if (state.filteredProduct.length !== 0) {
        console.log("hey its if block");
        const filteredRangeif = state.initialProduct.filter(
          (product) =>
            product.price >= state.minPrice && product.price <= action.payload
        );

        return {
          ...state,
          product: filteredRangeif,
          filteredProduct: filteredRangeif,
          maxPrice: action.payload,
        };
      } else {
        console.log("hey it is else block");
        const filteredRangeElse = state.initialProduct.filter(
          (product) =>
            product.price >= state.minPrice && product.price <= action.payload
        );
        return {
          ...state,
          product: filteredRangeElse,
          filteredProduct: filteredRangeElse,
          maxPrice: action.payload,
        };
      }
    case "FILTER_BY_RATING":
      // console.log("payload", action.payload);

      if (action.payload === 0) {
        return {
          ...state,
          product: state.initialProduct,
          filterRating: action.payload,
        };
      }
      return {
        ...state,
        product: state.initialProduct.filter(
          (product) => Math.ceil(product.rating) === action.payload
        ),
        filterRating: action.payload,
      };
    case "FILTER_SEARCH":
      return {
        ...state,
        product: state.initialProduct.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
  // console.log(state.cart);
}
