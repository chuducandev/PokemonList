import { DefaultPokemonLimit, RequestURL } from '@pokemon/constants';
import { ServiceHelper } from '@pokemon/helpers';
import {
    PokemonBriefsResponse,
    PokemonDetailModel,
    TypeBriefsResponse,
    TypeDetailModel,
} from '@pokemon/models';

export const getPokemonBriefs = async ({
    url = RequestURL.GetPokemonBriefs,
    limit = DefaultPokemonLimit,
}: {
    url?: string;
    limit?: number;
}) => {
    const params = {
        limit: limit.toString(),
    };
    const urlSearchParams = new URLSearchParams(params);
    const response: PokemonBriefsResponse = await ServiceHelper.getData<PokemonBriefsResponse>({
        url: `${url}?${urlSearchParams.toString()}`,
        instantiate: PokemonBriefsResponse.instantiateItem,
    });
    return response;
};

export const getTypeBriefs = async ({
    url = RequestURL.GetTypeBriefs,
    limit = DefaultPokemonLimit,
}: {
    url?: string;
    limit?: number;
}) => {
    const params = {
        limit: limit.toString(),
    };
    const urlSearchParams = new URLSearchParams(params);
    const response: TypeBriefsResponse = await ServiceHelper.getData<TypeBriefsResponse>({
        url: `${url}?${urlSearchParams.toString()}`,
        instantiate: TypeBriefsResponse.instantiateItem,
    });
    return response;
};

export const getTypeDetail = async ({ url }: { url: string }) => {
    const response: TypeDetailModel = await ServiceHelper.getData<TypeDetailModel>({
        url,
        instantiate: TypeDetailModel.instantiateItem,
    });
    return response;
};

export const getPokemonDetail = async ({ url }: { url: string }) => {
    const response: PokemonDetailModel = await ServiceHelper.getData<PokemonDetailModel>({
        url,
        instantiate: PokemonDetailModel.instantiateItem,
    });
    return response;
};
