import { Colors, Spacing16 } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    foundResults: {
        fontSize: scaleSize(16),
        fontWeight: 'bold',
        color: Colors.Black,
        marginTop: Spacing16,
    },
    foundResultsSkeleton: {
        marginTop: Spacing16,
    },
    contentContainer: {
        padding: Spacing16,
    },
    container: {
        height: '100%',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing16,
    },
});
