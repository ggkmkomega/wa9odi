import { UseAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = UseAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
