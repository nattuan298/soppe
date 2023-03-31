import React, { useEffect, useState } from "react";
import { GoogleMap, GoogleMapProps, Marker, useJsApiLoader } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import { browserConfig } from "src/constants/browser-config";
import { MAP_HEADQUARTER } from "src/constants/contants";

interface MapContainerProps {
  latitude: number;
  longitude: number;
  title?: string;
  googleMapUrl?: string;
}

export type CenterType = {
  lat: number;
  lng: number;
};

// const containerStyle = {
//   width: "880px",
//   height: "275px",
//   featureType: "administrative",
// };
const containerStyle = {
  width: "100%",
  height: "275px",
  featureType: "administrative",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: "greedy",
  backgroundColor: "white",
} as GoogleMapProps;

function MapContainer({ latitude, longitude, title, googleMapUrl }: MapContainerProps) {
  const [center, setCenter] = useState<CenterType>(MAP_HEADQUARTER);
  const [position, setPosition] = useState<CenterType>({
    lat: 0,
    lng: 0,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: browserConfig.keyMap,
  });

  useEffect(() => {
    setCenter({
      lat: latitude,
      lng: longitude,
    });
    setPosition({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

  const [, setMap] = React.useState(null);

  const mapRef = React.useRef();
  const onLoad = React.useCallback(
    (map) => {
      mapRef.current = map;
    },
    [mapRef],
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const onClickMarker = () => {
    window.open(googleMapUrl, "_blank");
  };

  return isLoaded ? (
    <GoogleMap
      id="map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapTypeId="terrain"
      options={options}
    >
      <Marker position={position} title={title} onClick={onClickMarker} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
