export type dataType = {
    email:string,
    name:string,
    phone:string,
    address:string,
    notes?:string,
}

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  cost: number;
  imagePath:string;
  category: string;
  size?:number
};

export type paystacksuccesresponse ={
  reference:string;
  transaction?:string,
  status?:string,
  message?:string
}

export type OrderType = {
  status:string,
  name:string,
  _id:string,
  email:string,
  reference:string
  amount?:number,
  address?:string,
  phone?:string,
  orderStatus:string,
  product?:string,
  category?:string,
  notes?:string,
}

export type User = {
    _id?:string,
    email:string,
    token?:string,
    admin?:true
}

export type readType = {
  _id?:string,
  dailyReading:number,
  balance?:number,
  createdAt:string
}

export type totalType = {
  _id?:string,
  currentBalance:number
}

export type CombinedRecord = {
  id: string;
  date: string;
  type: "sale" | "refill";
  unitSold: number | null;
  amountAdded: number | null;
  balanceAfter: number;
};

