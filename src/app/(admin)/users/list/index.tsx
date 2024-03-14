import { Text, FlatList, ActivityIndicator } from "react-native";
import { useAdminUsersList } from "@/api/users";
import UserListItem from "@/components/userListItem";
import { useInsertUserSubscription } from "@/api/users/subscriptions";

export default function OrdersScreen() {
  const {
    data: users,
    isLoading,
    error,
  } = useAdminUsersList({ activated: false });

  useInsertUserSubscription();
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
