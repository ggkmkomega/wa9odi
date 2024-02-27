import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, date: CartItem["date"]) => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  //youtu.be/rIYzLhkG9TA

  https: const addItem = (product: Product, date: CartItem["date"]) => {
    const newCartItem: CartItem = {
      id: "1",
      product,
      product_id: product.id,
      quantity: 1,
      date,
    };
    setItems([newCartItem, ...items]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
