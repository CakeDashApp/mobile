import * as React from "react"
import Svg, {G, Path, Rect} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Lock: React.FC<IconProps> = (props) => {

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
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Rect x={3} y={11} width={18} height={11} rx={2} ry={2}
                      fill={fill ? color : 'none'}/>
                <Path d="M7 11V7a5 5 0 0110 0v4"/>
            </G>
        </Svg>
    );
}

export default Lock;
