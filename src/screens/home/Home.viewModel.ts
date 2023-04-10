import { DefaultPageItems, ErrorCode } from '@pokemon/constants';
import { useDispatch, useGlobalState, useIsDarkMode, useMount } from '@pokemon/hooks';
import { useIsUnmounted } from '@pokemon/hooks/useIsUnmounted';
import {
    PokemonBriefModel,
    PokemonDetailModel,
    TypeBriefModel,
    TypeDetailModel,
} from '@pokemon/models';
import { ServiceManager } from '@pokemon/services';
import { pokemonListAction } from '@pokemon/store';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { getIntersection, getPageRange, isPageOutOfRange } from './Home.utils';

const defaultDependencies = {
    getPokemonBriefs: ServiceManager.pokemonService().getPokemonBriefs,
    getTypeBriefs: ServiceManager.pokemonService().getTypeBriefs,
    getTypeDetail: ServiceManager.pokemonService().getTypeDetail,
    getPokemonDetail: ServiceManager.pokemonService().getPokemonDetail,
};

export const useViewModel = (dependencies = defaultDependencies) => {
    const state = useGlobalState();
    const dispatch = useDispatch();
    const isUnmounted = useIsUnmounted();
    const isDarkMode = useIsDarkMode();

    const getAllPokemonBriefs = useCallback(async (): Promise<PokemonBriefModel[]> => {
        try {
            if (isUnmounted()) {
                return [];
            }

            const response = await dependencies.getPokemonBriefs({});

            return response.results;
        } catch (error) {
            if (__DEV__) {
                console.log(error);
            }
            dispatch(pokemonListAction.getInitialDataError(ErrorCode.Unknown, ''));
            return [];
        }
    }, [dependencies, dispatch, isUnmounted]);

    const getTypeBriefs = useCallback(async (): Promise<TypeBriefModel[]> => {
        try {
            if (isUnmounted()) {
                return [];
            }

            const response = await dependencies.getTypeBriefs({});

            return response.results;
        } catch (error) {
            if (__DEV__) {
                console.log(error);
            }
            dispatch(pokemonListAction.getInitialDataError(ErrorCode.Unknown, ''));
            return [];
        }
    }, [dependencies, dispatch, isUnmounted]);

    const getTypes = useCallback(async (): Promise<TypeDetailModel[]> => {
        try {
            if (isUnmounted()) {
                return [];
            }

            const typeBriefs = await getTypeBriefs();

            const types: TypeDetailModel[] = await Promise.all(
                typeBriefs.map(typeBrief =>
                    dependencies.getTypeDetail({
                        url: typeBrief.url,
                    })
                )
            );

            return types;
        } catch (error) {
            if (__DEV__) {
                console.log(error);
            }
            dispatch(pokemonListAction.getInitialDataError(ErrorCode.Unknown, ''));
            return [];
        }
    }, [dependencies, dispatch, getTypeBriefs, isUnmounted]);

    const getInitialData = useCallback(async () => {
        try {
            if (isUnmounted()) {
                return [];
            }

            const types: TypeDetailModel[] = await getTypes();
            const allPokemonBriefs: PokemonBriefModel[] = await getAllPokemonBriefs();
            const pokemon: PokemonDetailModel[] = await Promise.all(
                allPokemonBriefs
                    .slice(0, DefaultPageItems)
                    .map(pokemonBrief => dependencies.getPokemonDetail({ url: pokemonBrief.url }))
            );

            dispatch(pokemonListAction.getInitialDataSuccess(types, allPokemonBriefs, pokemon));
        } catch (error) {
            if (__DEV__) {
                console.log(error);
            }
            dispatch(pokemonListAction.getInitialDataError(ErrorCode.Unknown, ''));
            return [];
        }
    }, [dependencies, dispatch, getAllPokemonBriefs, getTypes, isUnmounted]);

    const changePage = useCallback(
        async (nextPage: number) => {
            try {
                if (isUnmounted()) {
                    return;
                }

                if (isPageOutOfRange(nextPage, state.pokemonBriefs.length)) {
                    return;
                }

                dispatch(pokemonListAction.changePageProcessing());

                const [start, end] = getPageRange(nextPage, state.pokemonBriefs.length);
                if (start >= end) {
                    return;
                }

                const pokemon: PokemonDetailModel[] = await Promise.all(
                    state.pokemonBriefs
                        .slice(start, end)
                        .map(pokemonBrief =>
                            dependencies.getPokemonDetail({ url: pokemonBrief.url })
                        )
                );

                dispatch(pokemonListAction.changePageSuccess(nextPage, pokemon));
            } catch (error) {
                if (__DEV__) {
                    console.log(error);
                }
                dispatch(pokemonListAction.changePageError(ErrorCode.Unknown, ''));
                return [];
            }
        },
        [dependencies, dispatch, isUnmounted, state.pokemonBriefs]
    );

    const changeTypeSelection = useCallback(
        async (type: TypeDetailModel, selected: boolean) => {
            try {
                if (isUnmounted()) {
                    return;
                }

                if (!state.types.some(t => _.isMatch(t, type))) {
                    return;
                }

                dispatch(pokemonListAction.changeTypeSelectionProcessing());

                const types = state.types.map(t => {
                    if (_.isMatch(t, type)) {
                        return {
                            ...t,
                            selected,
                        };
                    }
                    return t;
                });

                const selectedTypes = types.filter(t => t.selected === true);

                if (_.isEmpty(selectedTypes)) {
                    const pokemon: PokemonDetailModel[] = await Promise.all(
                        state.allPokemonBriefs
                            .slice(0, DefaultPageItems)
                            .map(pokemonBrief =>
                                dependencies.getPokemonDetail({ url: pokemonBrief.url })
                            )
                    );

                    dispatch(
                        pokemonListAction.changeTypeSelectionSuccess(
                            types,
                            state.allPokemonBriefs,
                            pokemon
                        )
                    );

                    return;
                }

                const pokemonBriefs = getIntersection(
                    types.filter(t => t.selected === true).map(t => t.pokemon.map(p => p.pokemon))
                );

                const [start, end] = getPageRange(0, pokemonBriefs.length);

                const pokemon: PokemonDetailModel[] = await Promise.all(
                    pokemonBriefs
                        .slice(start, end)
                        .map(pokemonBrief =>
                            dependencies.getPokemonDetail({ url: pokemonBrief.url })
                        )
                );

                dispatch(
                    pokemonListAction.changeTypeSelectionSuccess(types, pokemonBriefs, pokemon)
                );
            } catch (error) {
                if (__DEV__) {
                    console.log(error);
                }
                dispatch(pokemonListAction.changeTypeSelectionError(ErrorCode.Unknown, ''));
                return [];
            }
        },
        [dependencies, dispatch, isUnmounted, state.allPokemonBriefs, state.types]
    );

    const toggleType = useCallback(
        (type: TypeDetailModel) => changeTypeSelection(type, !type.selected),
        [changeTypeSelection]
    );

    const onPressNextPage = useCallback(() => {
        changePage(state.page + 1);
    }, [changePage, state.page]);

    const onPressPreviousPage = useCallback(() => {
        changePage(state.page - 1);
    }, [changePage, state.page]);

    const isNextPageDisabled = useMemo(() => {
        return isPageOutOfRange(state.page + 1, state.pokemonBriefs.length);
    }, [state.page, state.pokemonBriefs.length]);

    const isPreviousPageDisabled = useMemo(() => {
        return isPageOutOfRange(state.page - 1, state.pokemonBriefs.length);
    }, [state.page, state.pokemonBriefs.length]);

    useMount(() => {
        getInitialData();
    });

    return {
        state,
        isDarkMode,
        getAllPokemonBriefs,
        onPressNextPage,
        onPressPreviousPage,
        isNextPageDisabled,
        isPreviousPageDisabled,
        toggleType,
    };
};
