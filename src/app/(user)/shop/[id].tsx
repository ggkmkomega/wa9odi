import Button from "@/components/Button";
import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  View,
} from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { useProduct } from "@/api/products";

const productDetailSceen = () => {
  const [date, setDate] = useState<DateType>();
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();
  const router = useRouter();

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

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      {/* <RemoteImage
        style={styles.image}
        path={product.image}
        fallback={defaultProductImage}
      /> */}
      <Text style={styles.subtitle}>Select Date and Time:</Text>
      <DatePicker date={date} setDate={setDate} />
      <Text style={styles.price}>Price : DZD {product.price.toFixed(2)}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
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
    aspectRatio: 3 / 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
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
