import React, { memo, useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import Modal from '../Modal/Modal';

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else {
    return Math.round(num / 100) / 10 + 'K';
  }
};

const MapChart = ({ setTooltipContent }) => {
  const [geoUrl, setGeoUrl] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (error) => {
    setErrorMessage(error);
    setModalOpen(true);
  };

  const extractCountryNames = (data) => {
    if (!data || !data.objects || !data.objects.world || !data.objects.world.geometries) {
      return [];
    }
    return data.objects.world.geometries.map(geometry => geometry.properties.name);
  };
  const handleLogic = (geo) => {
    const { name } = geo.properties;
    console.log(geo, name);
    if (name === currentCountry) {
      console.log(`Current country selected: ${name}`);
      setErrorMessage(`Correct!!!! You Chose: ${name}.`);
      setModalOpen(true);
      // Update to a new country
      const newCountryIndex = Math.floor(Math.random() * countryList.length);
      setCurrentCountry(countryList[newCountryIndex]);
    } else {
      setErrorMessage(`INCORRECT You Chose: ${name}. Try Again`);
      setModalOpen(true);
      console.log(`Different country selected: ${name}`);
    }
  };
  

  useEffect(() => {
    import('./features.json')
      .then((data) => {
        setGeoUrl(data.default);
        const countries = extractCountryNames(data.default);
        setCountryList(countries);
        if (countries.length > 0) {
          setCurrentCountry(countries[Math.floor(Math.random() * countries.length)]); // Random initial country
        }
      })
      .catch((error) => {
        console.error('Error loading JSON:', error);
        showErrorModal('Failed to load map data.');
      });
  }, []);

  return (
    <>
      <div>
            {currentCountry && 

        <h1 className="countryName">Where is {currentCountry}?</h1>
        }
        <ComposableMap data-tip="" projectionConfig={{ scale: 220 }}>
          {geoUrl && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      handleLogic(geo);
                      const { POP_EST } = geo.properties;
                      setTooltipContent(`${currentCountry} - Population: ${rounded(POP_EST)}`);
                    }}
                    onMouseLeave={() => setTooltipContent('')}
                    style={{
                      default: { fill: '#D6D6DA', outline: 'none' },
                      hover: { fill: '#F53', outline: 'none' },
                      pressed: { fill: '#E42', outline: 'none' }
                    }}
                  />
                ))
              }
            </Geographies>
          )}
        </ComposableMap>

        <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
          <p>{errorMessage}</p>

        </Modal>
      </div>
    </>
  );
};

export default memo(MapChart);
