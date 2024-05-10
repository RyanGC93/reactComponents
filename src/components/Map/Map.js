import React, { memo, useEffect } from 'react'
// import { useSelector } from 'react-redux';
import {
  useZoomPan,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'

import MarkerComponent from './markers'

let geoUrl = null // Declare a global variable

import('./features.json')
  .then((data) => {
    geoUrl = data.default // Assign the JSON data to the global variable
    console.log(geoUrl) // Use or log the data
  })
  .catch((error) => console.error('Error loading JSON:', error))

// Later in your code, you can access geoUrl
console.log(geoUrl) // Note: This will be null until the import and assignment are complete

// coordinates are stored as >> [lon,lat]
const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn'
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M'
  } else {
    return Math.round(num / 100) / 10 + 'K'
  }
}

const CustomZoomableGroup = ({ children, ...restProps }) => {
  const { mapRef, transformString, position } = useZoomPan(restProps)
  return (
    <g ref={mapRef}>
      <rect fill="transparent" />
      <g transform={transformString}>{children(position)}</g>
    </g>
  )
}

const MapChart = ({ setTooltipContent, isChecked }) => {
  // const userEvents = useSelector((state) => {
  // 	if (isChecked) return Object.values(state.userEvents);
  // 	if (!isChecked) return Object.values(state.ambassadorEvents);
  // });

  // useEffect(() => {}, [isChecked]);
  let markers = []
  // userEvents.forEach((event) => {
  // 	markers.push({
  // 		markerOffset: -30,
  // 		name: `${event.title}`,
  // 		coordinates: [event.location_longitude, event.location_latitude],
  // 		id: event.booking_id,
  // 	});
  // });

  return (
    <>
      <div>
        <ComposableMap data-tip="" projectionConfig={{ scale: 220 }}>
          <CustomZoomableGroup center={[0, 0]}>
            {(position) => (
              <>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(
                      (geo) => (
                        console.log(geo, 'geo'),
                        (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => {
                              console.log(geo, 'geo')
                              const { NAME, POP_EST, ABBREV } = geo.properties
                              console.log(geo.properties, 'geo')
                              setTooltipContent(
                                `${NAME} — ${rounded(POP_EST)} - ${ABBREV}`
                              )
                            }}
                            onMouseLeave={() => {
                              setTooltipContent('')
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
                        )
                      )
                    )
                  }
                </Geographies>
                {markers.map(({ name, coordinates, markerOffset, id }) => (
                  <MarkerComponent
                    key={id}
                    name={name}
                    coordinates={coordinates}
                    markerOffset={markerOffset}
                  />
                ))}
              </>
            )}
          </CustomZoomableGroup>
        </ComposableMap>
      </div>
    </>
  )
}

export default memo(MapChart)
