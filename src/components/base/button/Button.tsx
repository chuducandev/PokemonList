import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({ title, onPress, disabled = false }: ButtonProps): JSX.Element => {
    const renderMainContent = useCallback(() => {
        const opacity = disabled ? 0.4 : 1;
        return (
            <TouchableOpacity
                style={[styles.container, { opacity }]}
                onPress={onPress}
                disabled={disabled}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        );
    }, [disabled, onPress, title]);

    return <>{renderMainContent()}</>;
};
