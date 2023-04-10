import { safeGetString } from '@pokemon/utils';
import _ from 'lodash';

export class TypeBriefModel {
    public constructor(public name: string, public url: string) {}

    public static instantiateItem(json: unknown = undefined): TypeBriefModel {
        const name = safeGetString(json, 'name', '');
        const url = safeGetString(json, 'url', '');

        return new TypeBriefModel(name, url);
    }

    public static instantiateList(jsonArray: unknown[] | undefined = undefined): TypeBriefModel[] {
        return _.chain(jsonArray)
            .map(json => TypeBriefModel.instantiateItem(json))
            .uniqWith((a, b) => _.isEqual(a, b))
            .value();
    }
}
