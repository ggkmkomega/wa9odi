import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, date: CartItem["date"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

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

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
