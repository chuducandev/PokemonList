import type { PropertyPath } from 'lodash';
import _ from 'lodash';

const isNilOrEmpty = (text: string | null | undefined): text is null | undefined => {
    const regexAllSpace = /^\s+$/;
    if (_.isNil(text) || _.isEmpty(text) || regexAllSpace.test(text)) {
        return true;
    }
    return false;
};

export const safeGet = (object: unknown, path: PropertyPath, defaultValue: unknown): any => {
    const value = _.get(object, path);
    return _.defaultTo(value, defaultValue);
};

export const safeGetArray = <T>(object: unknown, path: PropertyPath, defaultValue: T[]): T[] => {
    const value = _.get(object, path);
    const valueToReturn = _.defaultTo(value, defaultValue);
    if (_.isArray(valueToReturn)) {
        return valueToReturn;
    }
    return defaultValue;
};

export const safeGetString = (
    object: unknown,
    path: PropertyPath,
    defaultValue: string
): string => {
    let value = _.get(object, path);
    value = _.defaultTo(value, defaultValue);
    if (_.isNumber(value)) {
        return value.toString();
    }

    if (_.isString(value) && !isNilOrEmpty(value)) {
        return value;
    }
    return defaultValue;
};

export const safeGetNumber = (
    object: unknown,
    path: PropertyPath,
    defaultValue: number
): number => {
    let value = _.get(object, path);
    value = _.defaultTo(value, defaultValue);
    if (__DEV__) {
        if (_.isNil(value) || _.isNaN(value)) {
            console.warn(
                `safeGetNumber: path=[${path.toString()}] value=[${value}] must be a number.`
            );
        }
        if (_.isString(value)) {
            console.warn(
                `safeGetNumber:  path=[${path.toString()}] value=[${value}] must be a number.`
            );
        }
    }
    if (_.isNumber(value)) {
        return value;
    }

    return defaultValue;
};

export const safeGetBoolean = (
    object: unknown,
    path: PropertyPath,
    defaultValue: boolean
): boolean => {
    let value = _.get(object, path);
    value = _.defaultTo(value, defaultValue);

    if (_.isBoolean(value)) {
        return value;
    }
    return defaultValue;
};

export const safeGetDate = (object: unknown, path: PropertyPath, defaultValue: Date): Date => {
    let value = _.get(object, path);
    value = _.defaultTo(value, defaultValue);
    if (__DEV__) {
        if (_.isNil(value) || _.isNaN(value) || (!_.isString(value) && !_.isDate(value))) {
            console.warn(
                `safeGetNumber: path=[${path.toString()}] value=[${value}] must be a valid date string or a Date object.`
            );
        }
    }
    if (_.isDate(value)) {
        return value;
    }

    if (_.isString(value)) {
        const date = new Date(value);
        if (_.isDate(date) && date instanceof Date && !_.isNaN(date)) {
            return date;
        }

        if (_.isDate(defaultValue) && defaultValue instanceof Date && !_.isNaN(defaultValue)) {
            return defaultValue;
        }
    }

    return new Date();
};
