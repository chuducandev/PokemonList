import { Spacing16 } from '@pokemon/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container: { marginTop: Spacing16 },
    itemContainer: { marginBottom: Spacing16 },
});
