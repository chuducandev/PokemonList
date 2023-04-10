import { safeGet } from '@pokemon/utils';
import _ from 'lodash';
import { PokemonBriefModel } from './PokemonBriefModel';

export class TypePokemonBriefModel {
    public constructor(public pokemon: PokemonBriefModel) {}

    public static instantiateItem(json: unknown = undefined): TypePokemonBriefModel {
        const pokemon = PokemonBriefModel.instantiateItem(safeGet(json, 'pokemon', undefined));

        return new TypePokemonBriefModel(pokemon);
    }

    public static instantiateList(
        jsonArray: unknown[] | undefined = undefined
    ): TypePokemonBriefModel[] {
        return _.chain(jsonArray)
            .map(json => TypePokemonBriefModel.instantiateItem(json))
            .uniqWith((a, b) => _.isEqual(a, b))
            .value();
    }
}
