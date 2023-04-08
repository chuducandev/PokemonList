import { Strings } from '@pokemon/constants';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { TypeButton } from '../type-button';
import { styles } from './TypeList.styles';
import { TypeListProps } from './TypeList.types';

export const TypeList = ({ types }: TypeListProps) => {
    const renderItem = useCallback(({ item }: ListRenderItemInfo<string>) => {
        return <TypeButton type={item} onPress={() => {}} />;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Strings.TypeListTitle}</Text>
            <FlatList
                horizontal
                data={types}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                scrollEnabled={false}
            />
        </View>
    );
};
