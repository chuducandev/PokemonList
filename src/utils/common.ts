import { BaseScreenWidth } from '@pokemon/constants';
import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');

export const scaleSize = (size: number) => {
    // Calculate the scaled size based on the device's width and height
    const newSize = size * (width / BaseScreenWidth);

    // Limit the minimum size to avoid very small text on devices with high DPI
    const minimumSize = size * 0.5;

    // Return the scaled size, adjusted for screen pixel density
    return Math.max(minimumSize, PixelRatio.roundToNearestPixel(newSize));
};
