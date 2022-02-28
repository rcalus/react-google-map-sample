import React, { useState } from 'react';
import './App.css';
import MapContainerOpenStreet from './components/MapContainerOpenStreet';
import ShowPinpointCoordinates, { Coordinates } from './components/ShowPinpointCoordinates';

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])
  const addCoordinates = (newCoordinates: Coordinates) => {
    setCoordinates(coordinates => [...coordinates, newCoordinates]);
  }
  return (
    <>
      <MapContainerOpenStreet onMapClick={addCoordinates} />
      <ShowPinpointCoordinates coordinates={coordinates} />
    </>
  );
}

export default App;

