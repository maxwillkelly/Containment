import { ViralDetails } from '../../../interfaces/viralStore';

export const getBgColour = (state: boolean) =>
  state ? 'bg-selected' : 'hover:bg-gray-600';

export const calculateImmunity = (viralDetails: ViralDetails) => {
  const immune =
    viralDetails.cumulative.inoculated + viralDetails.cumulative.recovered;

  const immunity = (immune / 923000000) * 100;
  return immunity;
};
