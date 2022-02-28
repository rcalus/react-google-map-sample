import React from "react";
import { useEffect, useRef } from "react";

const MapContainer = (props: { onMapClick: (latLng: google.maps.LatLngLiteral) => void}) => {
  const ref = useRef<HTMLDivElement>(null);
  //const markers = 
  console.log('render');
 
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current as HTMLElement, { zoom: 17 });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
    map.addListener('click', function (event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        createMarker(event.latLng, map)
        props.onMapClick(event.latLng.toJSON());
      }
    });
  });

  const handleLocationError = (browserHasGeolocation: boolean) => {
    browserHasGeolocation
      ? console.log("Error: The Geolocation service failed.")
      : console.log("Error: Your browser doesn't support geolocation.")
  }

  const createMarker = (latlng: google.maps.LatLng, map: google.maps.Map) => {
    new google.maps.Marker({
      position: latlng,
      map: map,
      zIndex: Math.round(latlng.lat() * -100000) << 5
    });
  }

  return (<>
    <div ref={ref} id="map" />
  </>);
}

export default React.memo(MapContainer);