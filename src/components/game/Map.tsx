import React, { useState, useEffect, useRef } from 'react';

import MapOL from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';

const Map: React.FC = () => {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCoord, setSelectedCoord] = useState();

  const mapElement = useRef();

  // Initialize map
  useEffect(() => {
    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    // create map
    const initialMap = new MapOL({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: new XYZ({
            url:
              'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          }),
        }),

        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    });

    // save map and vector layer references to state
    setMap(initialMap);
    setFeaturesLayer(initalFeaturesLayer);
  }, []);

  return <div className="bg-white h-full w-full" ref={mapElement} />;
};

export default Map;
