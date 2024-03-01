import { type DateType } from "react-native-ui-datepicker";

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
  date: DateType;
};

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Preparing",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Preparing" | "Delivering" | "Delivered";

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  date: DateType;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
