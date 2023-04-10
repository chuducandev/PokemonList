import { ErrorCode, NetworkLoadingStatus } from '@pokemon/constants';
import { createReducer } from 'typesafe-actions';
import { PokemonListAction, pokemonListAction } from './actions';
import { PokemonListState } from './types';

export const getPokemonListState = (): PokemonListState => {
    return {
        typesLoadingStatus: NetworkLoadingStatus.Loading,
        pokemonLoadingStatus: NetworkLoadingStatus.Loading,
        types: [],
        allPokemonBriefs: [],
        pokemonBriefs: [],
        pokemon: [],
        page: 0,
        errorCode: ErrorCode.Unknown,
        errorMessage: '',
    };
};

export const pokemonListReducer = (initialState: PokemonListState) => {
    return createReducer<PokemonListState, PokemonListAction>(initialState)
        .handleAction(
            pokemonListAction.getInitialDataSuccess,
            (state, action): PokemonListState => {
                return {
                    ...state,
                    pokemonLoadingStatus: NetworkLoadingStatus.Success,
                    typesLoadingStatus: NetworkLoadingStatus.Success,
                    types: action.payload.types,
                    allPokemonBriefs: action.payload.allPokemonBriefs,
                    pokemonBriefs: action.payload.allPokemonBriefs,
                    pokemon: action.payload.pokemon,
                    page: 0,
                    errorCode: ErrorCode.Success,
                };
            }
        )
        .handleAction(pokemonListAction.getInitialDataProcessing, (state): PokemonListState => {
            return {
                ...state,
                pokemonLoadingStatus: NetworkLoadingStatus.Loading,
                typesLoadingStatus: NetworkLoadingStatus.Loading,
                errorCode: ErrorCode.Unknown,
            };
        })
        .handleAction(pokemonListAction.getInitialDataError, (state, action): PokemonListState => {
            return {
                ...state,
                pokemonLoadingStatus: NetworkLoadingStatus.Error,
                typesLoadingStatus: NetworkLoadingStatus.Error,
                errorCode: action.payload.errorCode,
                errorMessage: action.payload.errorMessage,
            };
        })
        .handleAction(pokemonListAction.changePageSuccess, (state, action): PokemonListState => {
            return {
                ...state,
                pokemonLoadingStatus: NetworkLoadingStatus.Success,
                page: action.payload.page,
                pokemon: action.payload.pokemon,
                errorCode: ErrorCode.Success,
            };
        })
        .handleAction(pokemonListAction.changePageProcessing, (state): PokemonListState => {
            return {
                ...state,
                pokemonLoadingStatus: NetworkLoadingStatus.Loading,
                errorCode: ErrorCode.Unknown,
            };
        })
        .handleAction(pokemonListAction.changePageError, (state, action): PokemonListState => {
            return {
                ...state,
                pokemonLoadingStatus: NetworkLoadingStatus.Error,
                errorCode: action.payload.errorCode,
                errorMessage: action.payload.errorMessage,
            };
        })
        .handleAction(
            pokemonListAction.changeTypeSelectionSuccess,
            (state, action): PokemonListState => {
                return {
                    ...state,
                    pokemonLoadingStatus: NetworkLoadingStatus.Success,
                    types: action.payload.types,
                    pokemonBriefs: action.payload.pokemonBriefs,
                    pokemon: action.payload.pokemon,
                    page: 0,
                    errorCode: ErrorCode.Success,
                };
            }
        )
        .handleAction(
            pokemonListAction.changeTypeSelectionProcessing,
            (state): PokemonListState => {
                return {
                    ...state,
                    pokemonLoadingStatus: NetworkLoadingStatus.Loading,
                    errorCode: ErrorCode.Unknown,
                };
            }
        )
        .handleAction(
            pokemonListAction.changeTypeSelectionError,
            (state, action): PokemonListState => {
                return {
                    ...state,
                    pokemonLoadingStatus: NetworkLoadingStatus.Error,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                };
            }
        );
};
