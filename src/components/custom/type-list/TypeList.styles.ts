import { Colors, ScreenWidth, Spacing16, Spacing32 } from '@pokemon/constants';
import { scaleSize } from '@pokemon/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        fontSize: scaleSize(16),
        fontWeight: 'bold',
        color: Colors.Black,
        marginTop: Spacing16,
        width: scaleSize(60),
    },
    titleSkeleton: {
        marginTop: Spacing16,
        marginRight: scaleSize(10),
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: ScreenWidth - Spacing32 - scaleSize(60),
    },
    container: { flexDirection: 'row' },
});
