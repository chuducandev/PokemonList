import { PokemonDetailModel } from '@pokemon/models';

export type PokemonListProps = {
    pokemon: PokemonDetailModel[];
    loading: boolean;
};
