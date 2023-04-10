import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BaseScreen, Button, PokemonList, SkeletonContainer, TypeList } from '@pokemon/components';
import { Colors, NetworkLoadingStatus, Strings } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import { styles } from './Home.styles';
import { useViewModel } from './Home.viewModel';

export const Home = (): JSX.Element => {
    const {
        state,
        isDarkMode,
        onPressNextPage,
        onPressPreviousPage,
        isNextPageDisabled,
        isPreviousPageDisabled,
        toggleType,
    } = useViewModel();

    const renderTypeFilter = useCallback(() => {
        return (
            <TypeList
                types={state.types}
                loading={state.typesLoadingStatus === NetworkLoadingStatus.Loading}
                onPressType={toggleType}
            />
        );
    }, [state.types, state.typesLoadingStatus, toggleType]);

    const renderFoundResults = useCallback(() => {
        const resultsFoundMessage = Strings.ResultsFoundMessage.replace(
            '<number>',
            state.pokemonBriefs.length.toString()
        );
        const skeletonWidth = scaleSize(160);
        const skeletonHeight = scaleSize(24);

        return (
            <SkeletonContainer
                loading={state.pokemonLoadingStatus === NetworkLoadingStatus.Loading}
                width={skeletonWidth}
                height={skeletonHeight}
                style={styles.foundResultsSkeleton}>
                <Text style={styles.foundResults}>{resultsFoundMessage}</Text>
            </SkeletonContainer>
        );
    }, [state.pokemonBriefs.length, state.pokemonLoadingStatus]);

    const renderPokemon = useCallback(() => {
        return (
            <PokemonList
                pokemon={state.pokemon}
                loading={state.pokemonLoadingStatus === NetworkLoadingStatus.Loading}
            />
        );
    }, [state.pokemon, state.pokemonLoadingStatus]);

    const renderFooter = useCallback(() => {
        if (state.pokemonLoadingStatus === NetworkLoadingStatus.Loading) {
            return <></>;
        }

        return (
            <View style={styles.footerContainer}>
                <Button
                    title={Strings.PreviousPageButton}
                    onPress={onPressPreviousPage}
                    disabled={isPreviousPageDisabled}
                />
                <Button
                    title={Strings.NextPageButton}
                    onPress={onPressNextPage}
                    disabled={isNextPageDisabled}
                />
            </View>
        );
    }, [
        isNextPageDisabled,
        isPreviousPageDisabled,
        onPressNextPage,
        onPressPreviousPage,
        state.pokemonLoadingStatus,
    ]);

    const renderMainContent = useCallback(() => {
        const backgroundColor = isDarkMode ? Colors.Black : Colors.White;

        return (
            <BaseScreen>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[styles.container, { backgroundColor }]}
                    contentContainerStyle={styles.contentContainer}>
                    {renderTypeFilter()}
                    {renderFoundResults()}
                    {renderPokemon()}
                    {renderFooter()}
                </ScrollView>
            </BaseScreen>
        );
    }, [isDarkMode, renderFooter, renderFoundResults, renderPokemon, renderTypeFilter]);

    return <>{renderMainContent()}</>;
};
