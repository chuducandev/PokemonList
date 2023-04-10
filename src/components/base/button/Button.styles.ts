import { Colors, Spacing6, Spacing8 } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: Spacing8,
        padding: Spacing8,
        borderRadius: Spacing6,
        backgroundColor: Colors.FaluRed,
    },
    title: {
        fontSize: scaleSize(16),
        color: Colors.White,
    },
});
