import Colors from "@/constants/Colors";
import { Product } from "@/types";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, Pressable } from "react-native"

export const defaultProductImage = 'https://source.unsplash.com/lP1RhcNrENM';

type ProductListItemProps = {
    product: Product,
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        < Link href = {`/shop/${product.id}`}  asChild>
        <Pressable  style= { styles.container } >
        <Image

        style={ styles.image }
    source = {{ uri: product.image || defaultProductImage }
}
/>
    < Text style = { styles.title } > { product.name } < /Text>
        < Text style = { styles.price } > DZD { product.price } </Text>
            
                < /Pressable>
                < /Link>
                );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 20,
        maxWidth: '50%'
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
