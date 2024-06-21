import {
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { Tables } from "@/types";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import RemoteImage from "./RemoteImage";

export const defaultProductImage = "https://source.unsplash.com/lP1RhcNrENM";

type ListItemsProps = {
  product: Tables<"products">;
};
const ListItems = ({ product }: ListItemsProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/shop/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          style={styles.image}
          path={product.image}
          fallback={defaultProductImage}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>DZD {product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,

    borderRadius: 20,
  },
});

export default ListItems;
