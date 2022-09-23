import * as React from "react"
import Svg, {G, Path, Rect} from "react-native-svg"
import {
    defaultColor,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const CPU: React.FC<IconProps> = (props) => {

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
                <Rect x={4} y={4} width={16} height={16} rx={2} ry={2} />
                <Path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
            </G>
        </Svg>
    );
}

export default CPU;
