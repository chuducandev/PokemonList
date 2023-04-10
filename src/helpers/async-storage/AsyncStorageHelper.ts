import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export const loadCachedData = async <CacheModel>(
    key: string,
    instantiate: (json: unknown) => CacheModel
): Promise<CacheModel | undefined> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (!_.isNil(value)) {
            return instantiate(JSON.parse(value));
        }
    } catch (error) {
        if (__DEV__) {
            console.log(error);
        }
    }
};

export const saveCachedData = <CacheModel>(key: string, value: CacheModel) => {
    try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        if (__DEV__) {
            console.log(error);
        }
    }
};
