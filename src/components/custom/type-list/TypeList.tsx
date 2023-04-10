import { SkeletonContainer } from '@pokemon/components/base';
import { Strings } from '@pokemon/constants';
import { TypeDetailModel } from '@pokemon/models';
import { scaleSize } from '@pokemon/utils';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { TypeButton } from '../type-button';
import { styles } from './TypeList.styles';
import { TypeListProps } from './TypeList.types';
import { getSkeletonData } from './TypeList.utils';

export const TypeList = ({ types, loading, onPressType }: TypeListProps) => {
    const renderItem = useCallback(
        (type: TypeDetailModel) => {
            return (
                <TypeButton
                    id={type.id}
                    loading={loading}
                    type={type.name}
                    selected={type.selected}
                    onPress={() => onPressType(type)}
                />
            );
        },
        [loading, onPressType]
    );

    const renderMainContent = useCallback(() => {
        const data = loading ? getSkeletonData() : types;
        const titleSkeletonWidth = scaleSize(50);
        const titleSkeletonHeight = scaleSize(28);

        return (
            <View style={styles.container}>
                <SkeletonContainer
                    loading={loading}
                    width={titleSkeletonWidth}
                    height={titleSkeletonHeight}
                    style={styles.titleSkeleton}>
                    <Text style={styles.title}>{Strings.TypeListTitle}</Text>
                </SkeletonContainer>
                <View style={styles.contentContainer}>{data.map(type => renderItem(type))}</View>
            </View>
        );
    }, [loading, renderItem, types]);

    return <>{renderMainContent()}</>;
};
