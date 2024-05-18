import { ActivityIndicator, FlatList, Text } from "react-native";
import ListItems from "@/components/ListItems";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error Loading Data</Text>;
  }

    
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
