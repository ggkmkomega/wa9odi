import "react-native-url-polyfill/auto";
import { View } from "react-native";
import { Redirect } from "expo-router";
import Account from "@/components/Acount";
import { UseAuth } from "@/providers/AuthProvider";

export default function App() {
  const { session } = UseAuth();
  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Redirect href={"/"} />
      )}
    </View>
  );
}
