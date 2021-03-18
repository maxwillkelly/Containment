import produce, { Draft } from 'immer';
import { State, StateCreator } from 'zustand';

// From zustand's immer middleware example: https://github.com/pmndrs/zustand
const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

export default immer;
