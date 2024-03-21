import { View, Text, Platform, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  //location shoudl be in cart context later

  const [location, setLocatoion] = useState();
  const router = useRouter();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Pressable
        onPress={() => {
          router.push("/location");
        }}
        style={{
          backgroundColor: "white",
          marginVertical: 10,
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            alignItems: "center",
          }}
        >
          {location ? `Location :${location} ` : "Please enter your location"}
        </Text>
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: "500" }}>
        Total : DZD {total}
      </Text>
      <Button text="Checkout" onPress={checkout} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
