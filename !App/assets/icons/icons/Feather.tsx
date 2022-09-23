import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultSize, defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Feather: React.FC<IconProps> = (props) => {

    // Set Default Props
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
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/>
            </G>
        </Svg>
    );
}

export default Feather;
