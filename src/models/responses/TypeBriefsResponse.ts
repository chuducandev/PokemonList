import { safeGetArray } from '@pokemon/utils';
import { TypeBriefModel } from '../objects';

export class TypeBriefsResponse {
    public constructor(public results: TypeBriefModel[]) {}

    public static instantiateItem(json: unknown = undefined): TypeBriefsResponse {
        const results = TypeBriefModel.instantiateList(safeGetArray(json, 'results', []));

        return new TypeBriefsResponse(results);
    }
}
