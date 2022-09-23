import * as React from "react"
import Svg, {Circle, G, Path, Rect} from "react-native-svg"
import {
    defaultColor,
    defaultSize, defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Image: React.FC<IconProps> = (props) => {

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
                <Rect x={3} y={3} width={18} height={18} rx={2} ry={2}/>
                <Circle cx={8.5} cy={8.5} r={1.5}/>
                <Path d="M21 15l-5-5L5 21"/>
            </G>
        </Svg>
    );
}

export default Image;
