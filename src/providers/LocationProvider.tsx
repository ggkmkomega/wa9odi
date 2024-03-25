import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";

type LocationType = {
  location: Location.LocationObject;
  address: Location.LocationGeocodedAddress;
  updateLocation: (location: Location.LocationObject) => void;
  updateAdress: (address: Location.LocationGeocodedAddress) => void;
};
const LocationContext = createContext<LocationType>({
  location: {
    coords: {
      accuracy: 600,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 37.4220936,
      longitude: -122.083922,
      speed: 0,
    },
    mocked: false,
    timestamp: 1711020545443,
  },
  updateLocation: () => {},
  address: {
    city: null,
    country: null,
    district: null,
    formattedAddress: null,
    isoCountryCode: null,
    name: null,
    postalCode: null,
    region: null,
    street: null,
    streetNumber: null,
    subregion: null,
    timezone: null,
  },
  updateAdress: () => {},
});

const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setlocation] = useState<Location.LocationObject>({
    coords: {
      accuracy: 600,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 37.4220936,
      longitude: -122.083922,
      speed: 0,
    },
    mocked: false,
    timestamp: 1711020545443,
  });
  const [address, setaddress] = useState<Location.LocationGeocodedAddress>({
    city: null,
    country: null,
    district: null,
    formattedAddress: null,
    isoCountryCode: null,
    name: null,
    postalCode: null,
    region: null,
    street: null,
    streetNumber: null,
    subregion: null,
    timezone: null,
  });

  //update lcoation
  const updateLocation = (newLocation: Location.LocationObject) => {
    setlocation(newLocation);
  };

  //update adress
  const updateAdress = (address: Location.LocationGeocodedAddress) => {
    setaddress(address);
  };
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setlocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <LocationContext.Provider
      value={{ address, updateAdress, location, updateLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
export const useLocation = () => useContext(LocationContext);
