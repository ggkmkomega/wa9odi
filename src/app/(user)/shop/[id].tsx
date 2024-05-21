import Button from "@/components/Button";
import dayjs from "dayjs";
import ModalDatePicker from "@/components/DatePicker";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import Moment from "moment";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  View,
} from "react-native";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
import { defaultProductImage } from "@/components/ListItems";

const productDetailSceen = () => {
  const now = new Date();
  const [date, setDate] = useState<Date>(now);
  const [open, setOpen] = useState(false);
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) return;
    if (!date) {
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
      <View>
        <RemoteImage
          style={styles.image}
          path={product.image}
          fallback={defaultProductImage}
        />
        <ModalDatePicker
          open={open}
          setOpen={setOpen}
          date={date}
          setDate={setDate}
        />
        <Text style={styles.sizeText}>
          Selected : {Moment(date).format("D MMM YYYY, hh:mm a")}
        </Text>
        <Text style={styles.price}>Price : DZD {product.price.toFixed(2)}</Text>
        <Button style={styles.btn} onPress={addToCart} text="Add to cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    paddingVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  btn: {
    marginVertical: 20,
  },
});
export default productDetailSceen;
