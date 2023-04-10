import { ErrorCode, NetworkLoadingStatus } from '@pokemon/constants';
import { PokemonListState } from '@pokemon/store';
import React from 'react';

export const StateContext = React.createContext<PokemonListState>({
    typesLoadingStatus: NetworkLoadingStatus.Success,
    pokemonLoadingStatus: NetworkLoadingStatus.Success,
    types: [],
    allPokemonBriefs: [],
    pokemonBriefs: [],
    pokemon: [],
    page: 0,
    errorCode: ErrorCode.Unknown,
    errorMessage: '',
});

export const StateContextProvider = StateContext.Provider;

export const StateContextConsumer = StateContext.Consumer;
