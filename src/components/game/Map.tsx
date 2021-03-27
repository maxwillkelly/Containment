import React, { useState, useEffect, useRef } from 'react';

import MapOL from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style, { StyleFunction } from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';

import { FeatureLike } from 'ol/Feature';
import * as states from '../../../map/geojson/states.geojson';

const Map: React.FC = () => {
  const [map, setMap] = useState<MapOL>();

  const mapElement = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    const generateStyles: (feature: FeatureLike) => Record<string, Style> = (
      feature
    ) => {
      return {
        MultiPolygon: new Style({
          stroke: new Stroke({
            color: 'yellow',
            width: 1,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
          }),
          text: new Text({
            font: 'bold 10px "Open Sans", "Arial Unicode MS", "sans-serif"',
            fill: new Fill({
              color: 'white',
            }),
            text: feature.get('Name'),
          }),
        }),
      };
    };

    const styleFunction: StyleFunction = (feature) => {
      const styles = generateStyles(feature);
      return styles[feature.getGeometry().getType()];
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(states),
      }),
      style: styleFunction,
    });

    // create map
    const initialMap = new MapOL({
      target: mapElement && mapElement.current ? mapElement.current : undefined,
      layers: [vectorLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: [528, -361],
        zoom: 17.2,
      }),
    });

    // save map and vector layer references to state
    setMap(initialMap);
  }, []);

  return <div className="h-full w-full z-0" ref={mapElement} />;
};

export default Map;
