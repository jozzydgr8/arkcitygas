export type dataType = {
    email:string,
    name:string,
    phone:string,
    address:string,
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type paystacksuccesresponse ={
  reference:string;
  transaction?:string,
  status?:string,
  message?:string
}