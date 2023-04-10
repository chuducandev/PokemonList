import { Spacing4 } from '@pokemon/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    pokemonImage: { alignSelf: 'center' },
    pokemonName: {
        flex: 1,
        textAlign: 'center',
        marginTop: Spacing4,
    },
    pokemonNameSkeleton: {
        marginTop: Spacing4,
        alignSelf: 'center',
    },
    pokemonImageSkeleton: { alignSelf: 'center' },
});
