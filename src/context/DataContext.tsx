import { createContext, useReducer } from "react";
import { OrderType, ProductType, User } from "../shared/types";

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
  searchQuery:string | null;
  admin:User[] | null;
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
type searchProps = {
  type:'searchQuery';
  payload:string | null
}
type postprops = {
  type:'addproduct',
  payload:ProductType
}
type adminProps = {
  type:'getadmin',
  payload:User[] | null
}
type updateadminProps ={
  type:'updateadmin',
  payload:User
}
type deletadminProps ={
  type:'deleteadmin',
  payload:string
}
type createadminProps = {
  type:'createadmin',
  payload:User
}


type actionProps = createadminProps | deletadminProps | updateadminProps | adminProps | productProps | orderProps | loadingProps | deleteProps |updateProductProps | updateOrderProps | searchProps | postprops;

const initialState: stateProps = {
  product: null,
  loading: false,
  orders: null,
  searchQuery: null,
  admin:null,
};

export const Context = createContext({} as valueProps);

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "getProduct":
      return { ...state, product: action.payload, loading: false };
    case "loading":
      return { ...state, loading: action.payload };
    case "getOrders":
      return { ...state, orders: action.payload, loading: false };
    case "searchQuery":
      return {...state, searchQuery:action.payload, loading: false}
    case "deleteProduct":
      return {
        ...state,
        product: state.product?.filter((p) => p._id !== action.payload) ?? null,
      };
    case "addproduct":
    return {
      ...state,
      product: [action.payload, ...(state.product ?? [])], // prepend the new product
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

    case 'getadmin':
      return {...state, admin:action.payload, loading:false};

    case "updateadmin": {
      const currentAdmins = state.admin ?? [];
      const exists = currentAdmins.some(p => p.email === action.payload.email);

      return {
        ...state,
        admin: exists
          ? currentAdmins.map(p =>
              p.email === action.payload.email ? action.payload : p
            )
          : [...currentAdmins, action.payload],
      };
    }

    case "deleteadmin":
        return {
          ...state,
          admin: state.admin?.filter((p) => p.email !== action.payload) ?? null,
        };
    case "createadmin":
    return {
      ...state,
    admin: [action.payload, ...(state.admin ?? [])],
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
