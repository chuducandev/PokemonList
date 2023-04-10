import { ErrorCode } from '@pokemon/constants';
import { PokemonBriefModel, PokemonDetailModel, TypeDetailModel } from '@pokemon/models';
import { ActionType, createAction } from 'typesafe-actions';

const getInitialDataSuccess = createAction(
    'PokemonList/getInitialDataSuccess',
    (
        types: TypeDetailModel[],
        allPokemonBriefs: PokemonBriefModel[],
        pokemon: PokemonDetailModel[]
    ) => ({
        types,
        allPokemonBriefs,
        pokemon,
    })
)();

const getInitialDataProcessing = createAction('PokemonList/getInitialDataProcessing', () => ({}))();

const getInitialDataError = createAction(
    'PokemonList/getInitialDataError',
    (errorCode: ErrorCode, errorMessage: string) => ({
        errorCode,
        errorMessage,
    })
)();

const changePageSuccess = createAction(
    'PokemonList/changePage',
    (page: number, pokemon: PokemonDetailModel[]) => ({ page, pokemon })
)();

const changePageProcessing = createAction('PokemonList/changePageProcessing', () => ({}))();

const changePageError = createAction(
    'PokemonList/changePageError',
    (errorCode: ErrorCode, errorMessage: string) => ({
        errorCode,
        errorMessage,
    })
)();

const changeTypeSelectionSuccess = createAction(
    'PokemonList/changeTypeSelection',
    (
        types: TypeDetailModel[],
        pokemonBriefs: PokemonBriefModel[],
        pokemon: PokemonDetailModel[]
    ) => ({
        types,
        pokemonBriefs,
        pokemon,
    })
)();

const changeTypeSelectionProcessing = createAction(
    'PokemonList/changeTypeSelectionProcessing',
    () => ({})
)();

const changeTypeSelectionError = createAction(
    'PokemonList/changeTypeSelectionError',
    (errorCode: ErrorCode, errorMessage: string) => ({
        errorCode,
        errorMessage,
    })
)();

export const pokemonListAction = {
    getInitialDataSuccess,
    getInitialDataProcessing,
    getInitialDataError,
    changePageSuccess,
    changePageProcessing,
    changePageError,
    changeTypeSelectionSuccess,
    changeTypeSelectionProcessing,
    changeTypeSelectionError,
};

export type PokemonListAction = ActionType<typeof pokemonListAction>;
