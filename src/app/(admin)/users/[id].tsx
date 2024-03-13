import { useUpdateUser, useUserDetails } from "@/api/users";
import UserItemListItem from "@/components/UserItemListItem";
import UserListItem from "@/components/userListItem";
import Colors from "@/constants/Colors";
import { UserStatus, UserStatusList } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

export default function UserDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];

  const { data: user, error, isLoading } = useUserDetails(id);
  const { mutate: UpdateOrder } = useUpdateUser();
  const updateStatus = (status: UserStatus) => {
    UpdateOrder({
      id,
      status: { activation: status },
    });
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !user) {
    return <Text>Failed to fetch users</Text>;
  }
  if (!user) {
    return <Text>Not Found</Text>;
  }
  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `User #${id}` }} />
      <FlatList
        data={user}
        renderItem={({ item }) => <UserItemListItem User={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => (
          <>
            <UserItemListItem User={user} />
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {UserStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      user.activation === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        user.activation === status
                          ? "white"
                          : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
