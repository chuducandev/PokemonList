import { DefaultPageItems } from '@pokemon/constants';
import { PokemonBriefModel } from '@pokemon/models';

export const isPageOutOfRange = (page: number, length: number) => {
    // return true if [page * DefaultPageItems, (page + 1) * DefaultPageItems) does not intersect [0, length)
    return page * DefaultPageItems >= length || (page + 1) * DefaultPageItems <= 0;
};

export const getPageRange = (page: number, length: number): [number, number] => {
    const start = page * DefaultPageItems;
    const end = Math.min((page + 1) * DefaultPageItems, length);
    return [start, end];
};

export const getIntersection = (pokemonBriefsList: PokemonBriefModel[][]): PokemonBriefModel[] => {
    return pokemonBriefsList.reduce((acc, pokemonBriefs) => {
        return acc.filter(pokemonBrief => {
            return pokemonBriefs.some(pokemonBrief2 => pokemonBrief2.name === pokemonBrief.name);
        });
    }, pokemonBriefsList[0] as PokemonBriefModel[]);
};
