import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Check: React.FC<IconProps> = (props) => {

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
                <Path d="M20 6L9 17l-5-5"/>
            </G>
        </Svg>
    );
}

export default Check;
