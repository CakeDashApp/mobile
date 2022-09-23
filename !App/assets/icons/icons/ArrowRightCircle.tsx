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

const ArrowRightCircle: React.FC<IconProps> = (props) => {

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
                <Circle cx={12} cy={12} r={10} fill={fill ? color : 'none'} stroke={color}/>
                <Path d="M12 16l4-4-4-4M8 12h8" fill={fill ? backgroundColor : 'none'}
                      stroke={fill ? backgroundColor : color}/>
            </G>
        </Svg>
    );
}

export default ArrowRightCircle;
