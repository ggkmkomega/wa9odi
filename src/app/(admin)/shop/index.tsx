import { FlatList } from "react-native";
import products from "@assets/data/products";
import ListItems from "@/components/ListItems";

export default function MenuScreen() {
  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      data={products}
      renderItem={({ item }) => <ListItems product={item} />}
    />
  );
}
