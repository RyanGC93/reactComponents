import React, { memo, useEffect, useState } from 'react';
import {
  useZoomPan,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import MarkerComponent from './markers';
import Modal from '../Modal/Modal'

// coordinates are stored as >> [lon, lat]
const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else {
    return Math.round(num / 100) / 10 + 'K';
  }
};

const MapChart = ({ setTooltipContent, isChecked }) => {
  const [geoUrl, setGeoUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const showErrorModal = (error) => {
    setErrorMessage(error)
    setModalOpen(true)
  }

  useEffect(() => {
    import('./features.json')
      .then((data) => {
        setGeoUrl(data.default);
        setLoaded(true); // Indicate that the data is loaded
      })
      .catch((error) => {
        console.error('Error loading JSON:', error);
        setLoaded(false);
      });
  }, []);

  let markers = []; // Ensure markers is defined even if not populated

  return (
    <>
      <div>
        <ComposableMap data-tip="" projectionConfig={{ scale: 220 }}>
          {loaded && geoUrl && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      const { NAME, POP_EST } = geo.properties;
                      setTooltipContent(`${NAME} - Population: ${rounded(POP_EST)}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: {
                        fill: '#D6D6DA',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#F53',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#E42',
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          )}
          {markers.map(({ name, coordinates, markerOffset, id }) => (
            <MarkerComponent
              key={id}
              name={name}
              coordinates={coordinates}
              markerOffset={markerOffset}
            />
          ))}
        </ComposableMap>
        <Modal isOpen={
          
          isModalOpen} close={() => setModalOpen(false)}>
              
      </Modal>
      </div>
    </>
  );
};

export default memo(MapChart);
