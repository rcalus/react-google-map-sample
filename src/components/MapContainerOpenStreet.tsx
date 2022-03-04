import { useEffect } from "react";
import L, { LatLngLiteral, LeafletMouseEvent } from "leaflet"
import { Coordinates } from "./ShowPinpointCoordinates";

const MapContainerOpenStreet = (props: { onMapClick: (coordinates: Coordinates) => void }) => {

    useEffect(() => {
        const map = L.map('map', {
            zoom: 20
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos: LatLngLiteral = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setView(pos);
                })
        }

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OSM contributors"
        }).addTo(map);

        map.on('click', function (e: LeafletMouseEvent) {
            new L.Marker(e.latlng).addTo(map);
            props.onMapClick({ lat: e.latlng.lat, long: e.latlng.lng });
        });

        return () => {
            map.off();
            map.remove();
        }
    }, [navigator.geolocation]);

    return (
        <>
            <div id="map"></div>
        </>

    )
}


export default MapContainerOpenStreet;