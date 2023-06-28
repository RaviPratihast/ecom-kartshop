import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  //   useState,
  //   useEffect,
} from "react";
// import axios from "axios";
import { items } from "../items";
import { reducer } from "../reducers/reducer";

// import { reducer } from "../reducers/reducer";

// creating the context
const ProductContext = createContext(null);
// using the context abstracting it from the normal user.
const useProduct = () => useContext(ProductContext);
let initialState = {
  initialProduct: items,
  product: items,
  filteredProduct: [],
  cart: [],
  // cart:{cartItems:[],totalPriceOfCartItems:0},
  wishlist: [],
  subTotalOfCart: 0,
  minPrice: 0,
  maxPrice: 6000,
  filterRating: 0,
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const subTotalOfCartCalc = state.cart.reduce(
      (acc, curr) => acc + curr.totalProductPrice,
      0
    );
    setSubTotal(subTotalOfCartCalc);
  }, [state.cart]);

  return (
    <ProductContext.Provider value={{ state, dispatch, subTotal }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, useProduct };
