import Button from "@/components/Button";
import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import products from "@assets/data/products";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Pressable,
} from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { FontAwesome } from "@expo/vector-icons";

const productDetailSceen = () => {
  const [date, setDate] = useState<DateType>();
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    const today = dayjs();
    if (!date || !!today.isAfter(date)) {
      ToastAndroid.show("Invalid Date", 1000);
      return;
    }
    addItem(product, date);
    router.push("/cart");
  };
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
      <Image
        resizeMode="contain"
        source={{ uri: product.image }}
        style={styles.image}
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
