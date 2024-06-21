import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "@/providers/LocationProvider";

const location = () => {
  const { location, updateLocation, address, updateAdress } = useLocation();
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 0,
    latitude: 0,
  });
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      updateLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
    reverseGeocode({ location });
    setDraggableMarkerCoord({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
  }, []);
  const transformLocation = (location: {
    longitude: number;
    latitude: number;
  }) => {
    const coords: Location.LocationObjectCoords = {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: null, // or some default value
      accuracy: null, // or some default value
      altitudeAccuracy: null, // or some default value
      heading: null, // or some default value
      speed: null, // or some default value
    };

    return {
      coords,
      timestamp: Date.now(), // or some other timestamp source
      mocked: false, // or some other default value
    };
  };
  const reverseGeocode = async ({
    location,
  }: {
    location: Location.LocationObject;
  }) => {
    if (!location) {
      return;
    }
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
    updateAdress(reverseGeocodedAddress[0]);
  };

  return (
    <>
      <View style={styles.mapview}>
        <MapView
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
        >
          <Marker
            draggable
            pinColor="#0000ff"
            coordinate={draggableMarkerCoord}
            onDragEnd={(e) => {
              console.log("waht i get", e.nativeEvent.coordinate);
              const newLoc: Location.LocationObject = transformLocation(
                e.nativeEvent.coordinate
              );
              reverseGeocode({ location: newLoc });
            }}
          />
        </MapView>
      </View>

      <View style={styles.containter}>
        <Text style={styles.Text}>
          {location
            ? `Location :${address?.formattedAddress} `
            : "Please enter your location"}
        </Text>
        <Button
          text="Set Location"
          onPress={() => {
            reverseGeocode({ location });
          }}
        />
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

export default location;
