/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';

import MapOL from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';

import Select from 'ol/interaction/Select';
import { defaults as defaultInteractions } from 'ol/interaction';
import { click } from 'ol/events/condition';

import { FeatureLike } from 'ol/Feature';
import * as states from '../../../map/geojson/states.json';
import useMapStore from '../../stores/MapStore';
import useViralStore from '../../stores/ViralStore';
import useGameStore from '../../stores/GameStore';

const Map: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<MapOL>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();

  const mapElement = useRef<HTMLDivElement>(null);

  const selectState = useMapStore((state) => state.selectState);
  const toggleMapDrawer = useMapStore((state) => state.toggleMapDrawer);

  const turn = useGameStore((state) => state.turn);
  const getViralDetails = useViralStore((state) => state.getViralDetails);

  // Initialize map
  useEffect(() => {
    const generateStyles: (
      feature: FeatureLike,
      clicked: boolean
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ) => Record<string, Style> = (feature, clicked) => {
      const name = feature.get('name');
      const { cumulative } = getViralDetails(turn, name);
      const { infected, death } = cumulative;

      const getFillStyles = () => {
        if (death) return 'rgb(239, 68, 68)';
        if (infected) return 'rgb(252, 211, 77)';
        return 'rgb(5, 150, 105)';
      };

      return {
        MultiPolygon: new Style({
          stroke: new Stroke({
            color: '#505050',
            width: 1,
          }),
          fill: new Fill({
            color: getFillStyles(),
          }),
          text: new Text({
            font: '0.8em Roboto',
            fill: new Fill({
              color:
                infected && !death ? 'rgb(17, 24, 39)' : 'rgb(229, 231, 235)',
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

    const initialFeaturesLayer = new VectorLayer({
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
      layers: [initialFeaturesLayer],
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
    setFeaturesLayer(initialFeaturesLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (featuresLayer) featuresLayer.changed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  return <div className="h-full w-full z-0" ref={mapElement} />;
};

export default Map;
