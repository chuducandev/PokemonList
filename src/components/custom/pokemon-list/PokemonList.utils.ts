import { Spacing16 } from '@pokemon/constants';
import { PokemonDetailModel } from '@pokemon/models';
import _ from 'lodash';
import { PokemonImageSize } from './PokemonList.constants';

export const getNumColumns = (screenWidth: number): number => {
    return Math.floor((screenWidth - Spacing16) / (PokemonImageSize + Spacing16));
};

export const getSkeletonData = () => {
    return Array.from({ length: 48 }, () =>
        PokemonDetailModel.instantiateItem({
            id: _.uniqueId(),
            name: 'Loading...',
        })
    );
};
