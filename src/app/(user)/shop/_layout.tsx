import Colors from "@/constants/Colors";
import { UseAuth } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function shopStack() {
  const router = useRouter();
  const { session } = UseAuth();

  if (!session) {
    router.replace("/");
  }
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        headerLeft: () => (
          <>
            <Link href="/profile" asChild>
              <Pressable onPress={() => router.push("/profile")}>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          </>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "shop" }} />
    </Stack>
  );
}
