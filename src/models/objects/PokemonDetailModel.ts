import { safeGetString } from '@pokemon/utils';
import _ from 'lodash';

export class PokemonDetailModel {
    public constructor(public id: string, public name: string, public image: string) {}

    public static instantiateItem(json: unknown = undefined): PokemonDetailModel {
        const id = safeGetString(json, 'id', _.uniqueId());
        const name = safeGetString(json, 'name', '');
        const image = safeGetString(
            json,
            'image',
            safeGetString(json, "sprites.other.['official-artwork'].front_default", '')
        );

        return new PokemonDetailModel(id, name, image);
    }

    public static instantiateList(
        jsonArray: unknown[] | undefined = undefined
    ): PokemonDetailModel[] {
        return _.chain(jsonArray)
            .map(json => PokemonDetailModel.instantiateItem(json))
            .uniqWith((a, b) => _.isEqual(a, b))
            .value();
    }
}
