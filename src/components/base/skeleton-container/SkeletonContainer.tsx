import { Colors, Spacing8 } from '@pokemon/constants';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SkeletonContainerProps } from './SkeletonContainer.types';

export const SkeletonContainer = (props: SkeletonContainerProps): JSX.Element => {
    const { loading, style, children, width, height, ...rest } = props;

    const renderMainContent = useCallback(() => {
        if (loading === true) {
            return (
                <View
                    {...rest}
                    style={[
                        style,
                        {
                            backgroundColor: Colors.Gray,
                            borderRadius: Spacing8,
                            width,
                            height,
                        },
                    ]}
                />
            );
        }

        return <View {...rest}>{children}</View>;
    }, [children, height, loading, rest, style, width]);

    return <>{renderMainContent()}</>;
};
