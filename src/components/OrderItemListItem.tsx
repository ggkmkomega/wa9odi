import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem, Tables } from "../types";
import { defaultProductImage } from "./ListItems";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
  item: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        style={styles.image}
        path={item.products.image}
        fallback={defaultProductImage}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>DZD{item.products.price.toFixed(2)}</Text>
          <Text>{item.date?.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
