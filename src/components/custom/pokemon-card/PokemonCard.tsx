import { SkeletonContainer } from '@pokemon/components/base';
import { Spacing16, Spacing72, Spacing96 } from '@pokemon/constants';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './PokemonCard.styles';
import { PokemonCardProps } from './PokemonCard.types';

export const PokemonCard = ({
    name,
    image,
    imageSize = Spacing96,
    loading,
}: PokemonCardProps): JSX.Element => {
    const renderMainContent = useCallback(() => {
        const width = imageSize;
        const height = imageSize;

        return (
            <View>
                <SkeletonContainer
                    width={width}
                    height={height}
                    loading={loading}
                    style={styles.pokemonImageSkeleton}>
                    <Image
                        style={[styles.pokemonImage, { width, height }]}
                        source={{ uri: image }}
                    />
                </SkeletonContainer>
                <SkeletonContainer
                    width={Spacing72}
                    height={Spacing16}
                    loading={loading}
                    style={styles.pokemonNameSkeleton}>
                    <Text style={styles.pokemonName}>{name}</Text>
                </SkeletonContainer>
            </View>
        );
    }, [image, imageSize, loading, name]);

    return <>{renderMainContent()}</>;
};
