import Button from "@/components/Button";
import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import products from "@assets/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { DateType } from "react-native-ui-datepicker";

const productDetailSceen = () => {
  const [date, setDate] = useState<DateType>();
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    const today = dayjs();
    if (!date || !!today.isAfter(date)) {
      //ToastAndroid.show("Invalid Date", 1000);
      console.warn("Error: Invalide date", today);
      return;
    }
    // addItem(product);
    console.warn("added, date: ", date);
  };
  if (!product) {
    return <Text>Product not found </Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        resizeMode="contain"
        source={{ uri: product.image }}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Select Date and Time:</Text>
      <DatePicker date={date} setDate={setDate} />
      <Text style={styles.price}>Price : DZD {product.price.toFixed(2)}</Text>
      <Button onPress={addToCart} text="Add to cart" />
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
    marginTop: "auto",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  litres: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});
export default productDetailSceen;
