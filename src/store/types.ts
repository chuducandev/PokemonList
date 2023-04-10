import { ErrorCode, NetworkLoadingStatus } from '@pokemon/constants';
import { PokemonBriefModel, PokemonDetailModel, TypeDetailModel } from '@pokemon/models';

export interface PokemonListState {
    typesLoadingStatus: NetworkLoadingStatus;
    pokemonLoadingStatus: NetworkLoadingStatus;
    types: TypeDetailModel[];
    allPokemonBriefs: PokemonBriefModel[];
    pokemonBriefs: PokemonBriefModel[];
    pokemon: PokemonDetailModel[];
    page: number;
    errorCode: ErrorCode;
    errorMessage: string;
}
