/* eslint-disable no-restricted-syntax */
import states from '../../map/geojson/states.json';
import { StateProps } from '../interfaces/states';

export const getStatesProps = () => {
  const { features } = states;
  const statesProps: StateProps[] = features.map((s) => s.properties);
  return statesProps;
};

export const getRandomStateByPopulation = () => {
  const statesProps = getStatesProps();

  const stateArray: string[] = [];

  for (const stateProps of statesProps) {
    const { name, population } = stateProps;

    for (let million = 0; million < population; million += 1000000) {
      stateArray.push(name);
    }
  }

  const index = Math.round(Math.random() * stateArray.length);

  return stateArray[index];
};
