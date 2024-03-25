import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInserItems } from "@/api/order-items";

type Product = Tables<"products">;
type CartType = {
  items: CartItem[];
  addItem: (product: Product, date: CartItem["date"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: (address: string) => void;
  updateaddress: (adress: string) => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  updateaddress: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInserItems();

  const router = useRouter();

  const addItem = (product: Product, date: CartItem["date"]) => {
    // if exists ++;
    //TODO add if exist and half an hour
    const existingitem = items.find(
      (item) => item.product === product && item.date === date
    );

    if (existingitem) {
      updateQuantity(existingitem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(), //generate
      product,
      product_id: product.id,
      quantity: 1,
      date,
    };
    setItems([newCartItem, ...items]);
  };

  //update quantty
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id != itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  const checkout = (address: string) => {
    if (items.length === 0) {
      return;
    }
    insertOrder(
      { total, address },
      {
        onSuccess: saveOrderItems,
      }
    );
  };
  const clearCart = () => {
    setItems([]);
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      date: item.date,
    }));
    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
