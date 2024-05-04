import { type DateType } from "react-native-ui-datepicker";
import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpadteTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Product = {
  id: number;
  image: string | null | undefined;
  name: string;
  price: number;
};

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

export const UserStatusList: UserStatus[] = ["Non-Activated", "Activated"];

export type OrderStatus = "New" | "Preparing" | "Delivering" | "Delivered";
export type UserStatus = "Non-Activated" | "Activated";

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
  activation: string;
  avatar_url: string | null;
  first_name: string | null;
  groupe: string;
  id: string;
  last_name: string | null;
  phone: number | null;
  updated_at: string | null;
  username: string | null;
  website: string | null;
} | null;
