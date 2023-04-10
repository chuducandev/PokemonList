import _ from 'lodash';
import { AsyncStorageHelper } from '../async-storage';
import { GetDataParams } from './ServiceHelper.types';

const callAPI = async <ResponseModel>({ url, instantiate }: GetDataParams<ResponseModel>) => {
    const response = await fetch(url);
    const jsonResult = await response.json();
    const result = instantiate(jsonResult);

    AsyncStorageHelper.saveCachedData<ResponseModel>(url, result);

    return result;
};

export const getData = async <ResponseModel>({
    url,
    instantiate,
}: GetDataParams<ResponseModel>) => {
    const cachedData = await AsyncStorageHelper.loadCachedData<ResponseModel>(url, instantiate);
    if (!_.isNil(cachedData)) {
        callAPI<ResponseModel>({ url, instantiate });
        return cachedData;
    }

    const result = await callAPI<ResponseModel>({ url, instantiate });
    return result;
};
