import { Colors } from '@pokemon/constants';
import { useIsDarkMode } from '@pokemon/hooks';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { BaseScreenProps } from './BaseScreen.types';

export const BaseScreen = ({ children }: BaseScreenProps): JSX.Element => {
    const isDarkMode = useIsDarkMode();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.Black : Colors.White,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {children}
        </SafeAreaView>
    );
};
