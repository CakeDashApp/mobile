import {Dimensions, PixelRatio, Platform} from "react-native";


//======================================================================================================================
//Normalize X
//======================================================================================================================

export const normalizeX = (size: number) => {
    //Get Screen WIDTH AND HEIGHT
    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

    //Calculate Scale
    const scale = SCREEN_WIDTH / 380;

    //Calculate new Size
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}


//======================================================================================================================
//Normalize Y
//======================================================================================================================

export const normalizeY = (size: number) => {
    //Get Screen WIDTH AND HEIGHT
    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

    //Calculate Scale
    const scale = SCREEN_WIDTH / 380;

    //Calculate new Size
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}
