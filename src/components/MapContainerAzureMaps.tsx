import { useEffect } from "react";
import L, { LatLngLiteral, LeafletMouseEvent } from "leaflet";

import { Coordinates } from "./ShowPinpointCoordinates";

const MapContainerAzureMaps = (props: { onMapClick: (coordinates: Coordinates) => void }) => {

    useEffect(() => {

        // const authOptions: AuthenticationOptions = {
        //     authType: 'subscriptionKey',
        //     subscriptionKey: 'p9Ze45nVVM4vW0C3Thcn7D8XM6ifhWramk0MwjDsXbw'
        // }
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
        const subscriptionKey: string = 'siD_9pjQu1FbJrqGyuItnukXod1eQhE1l3z_l13QudM';

        /*
                Tileset ID specifies which data layers to render in the tiles. Can be:
                                     
                'microsoft.base.road',  
                'microsoft.base.darkgrey',
                'microsoft.imagery', 
                'microsoft.weather.infrared.main', 
                'microsoft.weather.radar.main', 
                'microsoft.base.hybrid.road',
                'microsoft.base.labels.road '
            */
        const tilesetId: string = 'microsoft.base.road';

        //The language of labels. Supported languages: https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages
        const language: string = 'en-US';
        const view = 'Auto';

        L.tileLayer(`https://atlas.microsoft.com/map/tile?subscription-key=${subscriptionKey}&api-version=2.1&tilesetId=${tilesetId}&zoom={z}&x={x}&y={y}&tileSize=256&language=${language}&view=${view}`, {
            attribution: `© ${new Date().getFullYear()} TomTom, Microsoft`,
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


export default MapContainerAzureMaps;