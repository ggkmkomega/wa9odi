import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function shopStack() {
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
            <Link href="/sign-in" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="arrow-left"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    onPress={() => supabase.auth.signOut()}
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
