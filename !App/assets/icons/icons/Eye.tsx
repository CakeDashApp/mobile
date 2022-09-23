import * as React from "react"
import Svg, {Circle, G, Path} from "react-native-svg"
import {
    defaultBackgroundColor,
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Eye: React.FC<IconProps> = (props) => {

    // Set Default Props
    const fill = props.fill || defaultFill;
    const color = props.color || defaultColor;
    const backgroundColor = props.backgroundColor || defaultBackgroundColor;
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
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill={fill ? color : 'none'}/>
                <Circle cx={12} cy={12} r={3} fill={fill ? backgroundColor : 'none'}/>
            </G>
        </Svg>
    );
}

export default Eye;
