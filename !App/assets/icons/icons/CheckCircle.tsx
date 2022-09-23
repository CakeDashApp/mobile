import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultBackgroundColor,
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const CheckCircle: React.FC<IconProps> = (props) => {

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
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill={fill ? color : 'none'} stroke={color}/>
                <Path d="M22 4L12 14.01l-3-3" fill={fill ? color : 'none'} stroke={fill ? backgroundColor : color}/>
            </G>
        </Svg>
    );
}

export default CheckCircle;
