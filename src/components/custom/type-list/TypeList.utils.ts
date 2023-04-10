import { TypeDetailModel } from '@pokemon/models';
import _ from 'lodash';

export const getSkeletonData = () => {
    return Array.from({ length: 10 }, () =>
        TypeDetailModel.instantiateItem({ id: _.uniqueId(), name: 'Loading...', pokemon: [] })
    );
};
