import { Text, FlatList, ActivityIndicator } from "react-native";
import { useAdminUsersList } from "@/api/users";
import UserListItem from "@/components/userListItem";

export default function OrdersScreen() {
  const {
    data: users,
    isLoading,
    error,
  } = useAdminUsersList({ activated: false });

  //useInsertOrderSubscription();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
