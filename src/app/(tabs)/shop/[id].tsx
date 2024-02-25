import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const productDetailSceen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details " + id }} />
      <Text></Text>
      <Text style={{ fontSize: 20 }}>productDetailSceen for {id}</Text>
    </View>
  );
};

export default productDetailSceen;
