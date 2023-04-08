import { ScreenWidth, Spacing0, Spacing16 } from '@pokemon/constants';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { PokemonCard } from '../pokemon-card';
import { PokemonImageSize } from './PokemonList.constants';
import { styles } from './PokemonList.styles';
import { PokemonListProps } from './PokemonList.types';
import { getNumColumns } from './PokemonList.utils';

export const PokemonList = ({ pokemon }: PokemonListProps): JSX.Element => {
    const numColumns = useMemo(() => getNumColumns(ScreenWidth), []);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<{ name: string; image: string }>) => {
            const marginLeft = index % numColumns === 0 ? Spacing0 : Spacing16;
            return (
                <View style={[styles.itemContainer, { marginLeft }]}>
                    <PokemonCard name={item.name} image={item.image} imageSize={PokemonImageSize} />
                </View>
            );
        },
        [numColumns]
    );

    return (
        <FlatList
            data={pokemon}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
            style={styles.container}
            scrollEnabled={false}
        />
    );
};
