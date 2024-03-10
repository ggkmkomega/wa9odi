import { ActivityIndicator, FlatList, Text } from "react-native";
import { useAdminUsersList } from "@/api/users";
import UserListItem from "@/components/userListItem";

export default function OrdersScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminUsersList({ activated: true });
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error Loading Data</Text>;
  }
  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </>
  );
}
