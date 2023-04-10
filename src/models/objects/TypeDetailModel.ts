import { safeGetArray, safeGetNumber, safeGetString } from '@pokemon/utils';
import _ from 'lodash';
import { TypePokemonBriefModel } from './TypePokemonBriefModel';

export class TypeDetailModel {
    public constructor(
        public id: number,
        public name: string,
        public pokemon: TypePokemonBriefModel[],
        public selected: boolean = false
    ) {}

    public static instantiateItem(json: unknown = undefined): TypeDetailModel {
        console.log(
            'TypeDetailModel.instantiateItem(json: unknown = undefined): TypeDetailModel',
            JSON.stringify(json, null, 2)
        );
        const id = safeGetNumber(json, 'id', -1);
        const name = safeGetString(json, 'name', '');
        const pokemon = TypePokemonBriefModel.instantiateList(safeGetArray(json, 'pokemon', []));

        return new TypeDetailModel(id, name, pokemon);
    }

    public static instantiateList(jsonArray: unknown[] | undefined = undefined): TypeDetailModel[] {
        return _.chain(jsonArray)
            .map(json => TypeDetailModel.instantiateItem(json))
            .uniqWith((a, b) => _.isEqual(a, b))
            .value();
    }
}
