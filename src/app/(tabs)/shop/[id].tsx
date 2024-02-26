import Colors from "@/constants/Colors";
import products from "@assets/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const productDetailSceen = () => {
  const [litres, setLitres] = useState(1);
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  if (!product) {
    return <Text>Product not found </Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.label}>Select Litres:</Text>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          onPress={() => {
            if (litres > 1) {
              setLitres(litres - 1);
            }
          }}
          style={styles.button}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <TextInput
          inputMode="numeric"
          onChangeText={(e) => {
            const num = parseInt(e);
            Number.isNaN(num) ? setLitres(1) : setLitres(num);
          }}
          style={styles.litres}
        >
          {litres}
        </TextInput>
        <TouchableOpacity
          onPress={() => {
            setLitres(litres + 1);
          }}
          style={styles.button}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>DZD {product.price}</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectionContainer: {
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
