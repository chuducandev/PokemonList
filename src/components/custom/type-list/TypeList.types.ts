import { TypeDetailModel } from '@pokemon/models';

export type TypeListProps = {
    types: TypeDetailModel[];
    loading: boolean;
    onPressType: (type: TypeDetailModel) => void;
};
