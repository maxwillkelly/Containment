/* eslint-disable no-underscore-dangle */
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

import Select from 'ol/interaction/Select';
import { defaults as defaultInteractions } from 'ol/interaction';
import { click } from 'ol/events/condition';

import { FeatureLike } from 'ol/Feature';
import * as states from '../../../map/geojson/states.json';
import useMapStore from '../../stores/MapStore';

const Map: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<MapOL>();
  const mapElement = useRef<HTMLDivElement>(null);

  const selectState = useMapStore((state) => state.selectState);
  const toggleMapDrawer = useMapStore((state) => state.toggleMapDrawer);

  // Initialize map
  useEffect(() => {
    const generateStyles: (
      feature: FeatureLike,
      clicked: boolean
    ) => Record<string, Style> = (feature, clicked) => {
      const name = feature.get('name');

      return {
        MultiPolygon: new Style({
          stroke: new Stroke({
            color: '#505050',
            width: 1,
          }),
          fill: new Fill({
            color: clicked ? 'rgba(84, 121, 83, 1)' : 'rgba(84, 121, 83, 0.8)',
          }),
          text: new Text({
            font: '0.8em Roboto',
            fill: new Fill({
              color: 'white',
            }),
            text: name,
          }),
        }),
      };
    };

    const styleFunction = (feature: FeatureLike, clicked: boolean) => {
      const styles = generateStyles(feature, clicked);
      const geometry = feature.getGeometry();
      return geometry ? styles[geometry.getType()] : [];
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(states),
      }),
      style: (feature) => styleFunction(feature, false),
    });

    const selectClick = new Select({
      condition: click,
      style: (feature) => styleFunction(feature, true),
    });

    selectClick.on('select', (event) => {
      const features = event.target.getFeatures().array_;

      if (!features || features.length < 1) {
        selectState();
        toggleMapDrawer(false);
        return;
      }

      const feature = features[0];
      selectState(feature.values_);
      toggleMapDrawer(true);
    });

    // create map
    const initialMap = new MapOL({
      target: mapElement && mapElement.current ? mapElement.current : undefined,
      layers: [vectorLayer],
      controls: [],
      interactions: defaultInteractions().extend([selectClick]),
      view: new View({
        projection: 'EPSG:3857',
        center: [528, -361],
        zoom: 17.2,
      }),
    });

    // save map and vector layer references to state
    setMap(initialMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="h-full w-full z-0" ref={mapElement} />;
};

export default Map;
