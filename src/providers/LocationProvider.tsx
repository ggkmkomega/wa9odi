import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInserItems } from "@/api/order-items";
import * as Location from "expo-location";

type LocationType = {
  location: Location.LocationObject;
  updateLocation: (location: Location.LocationObject) => void;
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

  //update lcoation
  const updateLocation = (newLocation: Location.LocationObject) => {
    setlocation(newLocation);
  };
  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
export const useLocation = () => useContext(LocationContext);
