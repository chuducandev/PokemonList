import { SkeletonContainer } from '@pokemon/components/base';
import { Colors, Spacing16, Spacing24, Spacing72 } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './TypeButton.styles';
import { TypeButtonProps } from './TypeButton.types';

export const TypeButton = ({
    id,
    type,
    onPress,
    loading,
    selected,
}: TypeButtonProps): JSX.Element => {
    const renderMainContent = useCallback(() => {
        const skeletonWidth = Spacing72 + Math.random() * Spacing24;
        const skeletonHeight = Spacing16 + scaleSize(24);
        const backgroundColor = selected ? Colors.FaluRed : Colors.White;
        const color = selected ? Colors.White : Colors.FaluRed;

        return (
            <SkeletonContainer
                loading={loading}
                width={skeletonWidth}
                height={skeletonHeight}
                style={styles.containerSkeleton}
                key={`${id}-${type}${loading ? '-loading' : ''}`}>
                <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress}>
                    <Text style={[styles.typeTitle, { color }]}>{type}</Text>
                </TouchableOpacity>
            </SkeletonContainer>
        );
    }, [id, loading, onPress, selected, type]);

    return <>{renderMainContent()}</>;
};
