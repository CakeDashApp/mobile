import * as React from "react"
import Svg, {G, Path, Rect} from "react-native-svg"
import {
    defaultColor,
    defaultSize, defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const SmartPhone: React.FC<IconProps> = (props) => {

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
                <Rect x={5} y={2} width={14} height={20} rx={2} ry={2}/>
                <Path d="M12 18h.01"/>
            </G>
        </Svg>
    );
}

export default SmartPhone;
