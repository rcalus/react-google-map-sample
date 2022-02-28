export interface Coordinates {
    lat: number,
    long: number
}

const ShowPinpointCoordinates = (props: { coordinates: Coordinates[]} ) => {
    
    console.log('props.coordinates', props.coordinates);
    return (
        <div>
            Coordinates:
            <ul>
            {props.coordinates.map((c, index) => (
                <li key={index}>{c.lat}, {c.long}</li>
            ))}
            </ul>
        </div>)

}

export default ShowPinpointCoordinates;