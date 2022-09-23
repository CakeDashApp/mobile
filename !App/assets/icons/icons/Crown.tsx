import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import {
    defaultColor,
    defaultSize,
    defaultStrokeWidth,
    IconProps,
    defaultFill,
} from "../interface/icon-constants.interface";


const Crown: React.FC<IconProps> = (props) => {

    // Set Default Props
    const fill = props.fill || defaultFill;
    const color = props.color || defaultColor;
    const size = props.size || defaultSize;
    const strokeWidth = props.strokeWidth || defaultStrokeWidth;

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"

        >
            <G
                stroke={color}
                strokeWidth={strokeWidth}
                fill={fill ? color : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </G>
        </Svg>
    );
}

export default Crown;
