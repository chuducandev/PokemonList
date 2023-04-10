import { ScreenWidth, Spacing0, Spacing16 } from '@pokemon/constants';
import { PokemonDetailModel } from '@pokemon/models';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { PokemonCard } from '../pokemon-card';
import { PokemonImageSize } from './PokemonList.constants';
import { styles } from './PokemonList.styles';
import { PokemonListProps } from './PokemonList.types';
import { getNumColumns, getSkeletonData } from './PokemonList.utils';

export const PokemonList = ({ pokemon, loading }: PokemonListProps): JSX.Element => {
    const numColumns = useMemo(() => getNumColumns(ScreenWidth), []);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<PokemonDetailModel>) => {
            const marginLeft = index % numColumns === 0 ? Spacing0 : Spacing16;
            return (
                <View style={[styles.itemContainer, { marginLeft }]}>
                    <PokemonCard
                        name={item.name}
                        image={item.image}
                        imageSize={PokemonImageSize}
                        loading={loading}
                    />
                </View>
            );
        },
        [loading, numColumns]
    );

    const renderSkeleton = useCallback(() => {
        if (!loading) {
            return <></>;
        }
        return (
            <FlatList
                data={getSkeletonData()}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}-${item.name}-skeleton`}
                style={styles.skeletonContainer}
                scrollEnabled={false}
                numColumns={numColumns}
            />
        );
    }, [loading, numColumns, renderItem]);

    const renderPokemonList = useCallback(() => {
        if (loading) {
            return <></>;
        }
        return (
            <FlatList
                data={pokemon}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}-${item.name}`}
                style={styles.container}
                scrollEnabled={false}
                numColumns={numColumns}
            />
        );
    }, [loading, numColumns, pokemon, renderItem]);

    const renderMainContent = useCallback(() => {
        if (loading) {
            return renderSkeleton();
        }
        return renderPokemonList();
    }, [loading, renderPokemonList, renderSkeleton]);

    return <>{renderMainContent()}</>;
};
