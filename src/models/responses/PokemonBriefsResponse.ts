import { safeGetArray } from '@pokemon/utils';
import { PokemonBriefModel } from '../objects';

export class PokemonBriefsResponse {
    public constructor(public results: PokemonBriefModel[]) {}

    public static instantiateItem(json: unknown = undefined): PokemonBriefsResponse {
        const results = PokemonBriefModel.instantiateList(safeGetArray(json, 'results', []));

        return new PokemonBriefsResponse(results);
    }
}
