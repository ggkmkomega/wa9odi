import { Stack } from "expo-router";

export default function shopStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "shop" }} />
    </Stack>
  );
}
