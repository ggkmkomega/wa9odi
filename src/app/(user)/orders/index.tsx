import { ActivityIndicator, FlatList, Text } from "react-native";
import { Stack } from "expo-router";
import OrderListItem from "@/components/OrderListItem";
import { usemyOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const { data: orders, error, isLoading } = usemyOrderList();
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error Loading Data</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
