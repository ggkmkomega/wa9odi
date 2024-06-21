import Colors from "@/constants/Colors";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/api/products";
import { defaultProductImage } from "@/components/ListItems";
import RemoteImage from "@/components/RemoteImage";

const productDetailSceen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }

  if (!product) {
    return <Text>Product not found </Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "shop",
          headerRight: () => (
            <Link href={`/(admin)/shop/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        style={styles.image}
        path={product.image}
        fallback={defaultProductImage}
      />

      <Text style={styles.title}>title : {product.name}</Text>

      <Text style={styles.price}>Price : DZD {product.price.toFixed(2)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default productDetailSceen;
