import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

type AdminLocationProps = {
  address: string;
};

const Adminlocation = ({ address }: AdminLocationProps) => {
  const location = Location.geocodeAsync(address);
  console.log(location);
  return (
    <>
      {/*   <View style={styles.mapview}>
        <MapView
          region={region}
          initialRegion={{
            latitude: 34.3393383640189,
            latitudeDelta: 5.989749180739889,
            longitude: 2.912419494241476,
            longitudeDelta: 4.462245292961597,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          style={styles.map}
        />
        </View>*/}
      <View style={styles.containter}>
        <Text style={styles.Text}>{`Location :${address} `}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mapview: {
    backgroundColor: "pink",
    height: "85%",
    width: "auto",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  Text: {
    fontSize: 20,
    fontWeight: "500",
  },
  containter: {
    paddingHorizontal: 20,
    alignItems: "center",
    alignContent: "center",
  },
  btns: {},
});

export default Adminlocation;
