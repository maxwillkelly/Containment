export interface States {
  type: string;
  name: string;
  crs: Crs;
  features?: FeaturesEntity[] | null;
}

export interface Crs {
  type: string;
  properties: CrsProperties;
}

export interface CrsProperties {
  name: string;
}

export interface FeaturesEntity {
  type: string;
  properties: StateProps;
  geometry: Geometry;
}

export interface StateProps {
  fid: number;
  name: string;
  abbreviation: string;
  population: number;
}

export interface Geometry {
  type: string;
  coordinates?: (((number[] | null)[] | null)[] | null)[] | null;
}
