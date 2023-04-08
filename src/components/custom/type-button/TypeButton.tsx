import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './TypeButton.styles';
import { TypeButtonProps } from './TypeButton.types';

export const TypeButton = ({ type, onPress }: TypeButtonProps): JSX.Element => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.typeTitle}>{type}</Text>
        </TouchableOpacity>
    );
};
