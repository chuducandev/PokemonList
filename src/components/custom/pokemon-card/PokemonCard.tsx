import { Spacing96 } from '@pokemon/constants';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './PokemonCard.styles';
import { PokemonCardProps } from './PokemonCard.types';

export const PokemonCard = ({
    name,
    image,
    imageSize = Spacing96,
}: PokemonCardProps): JSX.Element => {
    const renderMainContent = useCallback(() => {
        const width = imageSize;
        const height = imageSize;

        return (
            <View>
                <Image style={{ width, height }} source={{ uri: image }} />
                <Text style={styles.pokemonName}>{name}</Text>
            </View>
        );
    }, [image, imageSize, name]);

    return <>{renderMainContent()}</>;
};
