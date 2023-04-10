import { safeGetString } from '@pokemon/utils';
import _ from 'lodash';

export class PokemonBriefModel {
    public constructor(public name: string, public url: string) {}

    public static instantiateItem(json: unknown = undefined): PokemonBriefModel {
        const name = safeGetString(json, 'name', '');
        const url = safeGetString(json, 'url', '');

        return new PokemonBriefModel(name, url);
    }

    public static instantiateList(
        jsonArray: unknown[] | undefined = undefined
    ): PokemonBriefModel[] {
        return _.chain(jsonArray)
            .map(json => PokemonBriefModel.instantiateItem(json))
            .uniqWith((a, b) => _.isEqual(a, b))
            .value();
    }
}
