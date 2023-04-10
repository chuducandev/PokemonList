import { ViewProps } from 'react-native';

export type SkeletonContainerProps = ViewProps & {
    loading: boolean;
    width?: number;
    height?: number;
};
