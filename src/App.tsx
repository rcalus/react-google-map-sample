import React, { useState } from 'react';
import './App.css';
import MapContainerOpenStreet from './components/MapContainerOpenStreet';
import ShowPinpointCoordinates, { Coordinates } from './components/ShowPinpointCoordinates';
import MapContainerAzureMaps from './components/MapContainerAzureMaps';
function App() {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])
  const addCoordinates = (newCoordinates: Coordinates) => {
    setCoordinates(coordinates => [...coordinates, newCoordinates]);
  }
  const showAzure = true;
  return (
    <>
      {showAzure ? <MapContainerAzureMaps onMapClick={addCoordinates} /> : <MapContainerOpenStreet onMapClick={addCoordinates} />}      
      <ShowPinpointCoordinates coordinates={coordinates} />
    </>
  );
}

export default App;

