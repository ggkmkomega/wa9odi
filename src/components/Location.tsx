import { View, Text } from "react-native";
import React from "react";

type LocationProps = {
  address: string;
};
const Location = ({ address }: LocationProps) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          alignItems: "center",
        }}
      >
        {`Location :${address} `}
      </Text>
    </View>
  );
};

export default Location;
