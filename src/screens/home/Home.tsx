import React, { useCallback } from 'react';
import { ScrollView, Text } from 'react-native';

import { BaseScreen, PokemonList, TypeList } from '@pokemon/components';
import { Colors, Strings } from '@pokemon/constants';
import { useIsDarkMode } from '@pokemon/hooks';
import { styles } from './Home.styles';

export const Home = (): JSX.Element => {
    const isDarkMode = useIsDarkMode();

    const renderTypeFilter = useCallback(() => {
        return <TypeList types={Array.from({ length: 10 }, () => 'type')} />;
    }, []);

    const renderFoundResults = useCallback(() => {
        const resultsFoundMessage = Strings.ResultsFoundMessage.replace('<number>', '100');
        return <Text style={styles.foundResults}>{resultsFoundMessage}</Text>;
    }, []);

    const renderPokemon = useCallback(() => {
        return (
            <PokemonList
                pokemon={Array.from({ length: 10 }, () => ({
                    name: 'ditto',
                    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png',
                }))}
            />
        );
    }, []);

    const renderMainContent = useCallback(() => {
        const backgroundColor = isDarkMode ? Colors.Black : Colors.White;

        return (
            <BaseScreen>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{ backgroundColor }}
                    contentContainerStyle={styles.contentContainer}>
                    {renderTypeFilter()}
                    {renderFoundResults()}
                    {renderPokemon()}
                </ScrollView>
            </BaseScreen>
        );
    }, [isDarkMode, renderFoundResults, renderPokemon, renderTypeFilter]);

    return <>{renderMainContent()}</>;
};
