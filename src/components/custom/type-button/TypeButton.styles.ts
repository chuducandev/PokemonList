import { Colors, Spacing2, Spacing6, Spacing8 } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        margin: Spacing8,
        padding: Spacing8,
        borderRadius: Spacing6,
        borderWidth: Spacing2,
        borderColor: Colors.FaluRed,
    },
    typeTitle: {
        fontSize: scaleSize(16),
        fontWeight: 'bold',
        color: Colors.FaluRed,
    },
});
