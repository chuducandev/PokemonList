import { Spacing16 } from '@pokemon/constants';
import { PokemonImageSize } from './PokemonList.constants';

export const getNumColumns = (screenWidth: number): number => {
    return Math.floor((screenWidth - Spacing16) / (PokemonImageSize + Spacing16));
};
