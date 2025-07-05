import { createContext, useReducer } from "react";
import { OrderType, ProductType } from "../shared/types";

export type valueProps = stateProps & {
  dispatch: React.Dispatch<actionProps>;
};

type contextProps = {
  children: React.ReactNode;
};

type stateProps = {
  product: ProductType[] | null;
  loading: boolean;
  orders: OrderType[] | null;
};

type productProps = {
  type: "getProduct";
  payload: ProductType[] | null;
};

type orderProps = {
  type: "getOrders";
  payload: OrderType[] | null;
};

type loadingProps = {
  type: "loading";
  payload: boolean;
};

type deleteProps ={
  type:'deleteProduct',
  payload:string
}
type updateProductProps = {
  type: "updateProduct";
  payload: ProductType;
};
type updateOrderProps = {
  type: "updateOrder";
  payload: OrderType;
};

type actionProps = productProps | orderProps | loadingProps | deleteProps |updateProductProps | updateOrderProps;

const initialState: stateProps = {
  product: null,
  loading: false,
  orders: null,
};

export const Context = createContext({} as valueProps);

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "getProduct":
      return { ...state, product: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "getOrders":
      return { ...state, orders: action.payload };
    case "deleteProduct":
      return {
        ...state,
        product: state.product?.filter((p) => p._id !== action.payload) ?? null,
      };
    case "updateProduct":
    return {
      ...state,
      product: state.product?.map(p =>
        p._id === action.payload._id ? action.payload : p
      ) ?? null,
    };
     case "updateOrder":
    return {
      ...state,
      orders: state.orders?.map(p =>
        p._id === action.payload._id ? action.payload : p
      ) ?? null,
    };
    default:
      return state;
  }
};

export const DataContext = ({ children }: contextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
