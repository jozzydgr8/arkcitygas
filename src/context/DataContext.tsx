import { createContext, useReducer } from "react";
import { OrderType, ProductType, User, readType, CombinedRecord, totalType } from "../shared/types";

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
  subscribers:User[] | null;
  readings:readType[] | null;
  combined:CombinedRecord[] | null;
  total:totalType[] | null
};

type readProps = {
  type:'getReadings',
  payload:readType[] | null
}

type combinedProps = {
  type:'getCombined',
  payload:CombinedRecord[] | null
}

type totalProps = {
  type: 'getTotal',
  payload:totalType[] | null;
}

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
type updateReadingProps ={
  type:'updateReadings';
  payload:readType
}
type updateCombinedProps = {
  type:'updateCombined';
  payload:CombinedRecord

}

type updateTotalProps = {
  type:'updateTotal';
  payload:totalType
}

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

type subscribeProps ={
  type:'getSubscribers',
  payload:User[]
}

type actionProps = totalProps| updateTotalProps |combinedProps | updateCombinedProps | updateReadingProps|readProps | subscribeProps | createadminProps | deletadminProps | updateadminProps | adminProps | productProps | orderProps | loadingProps | deleteProps |updateProductProps | updateOrderProps | searchProps | postprops;

const initialState: stateProps = {
  product: null,
  loading: false,
  orders: null,
  searchQuery: null,
  admin:null,
  subscribers:null,
  readings:null,
  total:null,
  combined:null
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
        p._id === action.payload._id ? {...action.payload} : p
      ) ?? null,
    };
     case "updateOrder":
    return {
      ...state,
      orders: state.orders?.map(p =>
        p._id === action.payload._id ? {...action.payload} : p
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
              p.email === action.payload.email ? {...action.payload} : p
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

    case "getSubscribers":
      return{
        ...state, subscribers:action.payload, loading:false
      }

      case "getReadings":
        return{
          ...state, readings:action.payload, loading:false
        }

        case "updateReadings":
          return{
            ...state, 
            readings:state.readings?.map(r=>
              r._id === action.payload._id ? {...action.payload}:r)?? null,
          }
        case "getCombined":
          return{
            ...state, combined:action.payload, loading:false
          }

          case "updateCombined":
            return {
              ...state,
              combined: state.combined?.map(c =>
                c.id === action.payload.id ? {...action.payload} : c
              ) ?? null,
            };
          case "getTotal":
            return{
              ...state, total:action.payload, loading:false
            }
            case "updateTotal":
              return {
              ...state,
              total: state.total?.map(t =>
                t._id === action.payload._id ? {...action.payload} : t
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
