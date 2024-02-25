import Colors from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import products from '@assets/data/products';

const product = products[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>DZD {product.price}</Text>
      <Image style={styles.image} source={{ uri: product.image }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,

    borderRadius: 20,
  }
});
