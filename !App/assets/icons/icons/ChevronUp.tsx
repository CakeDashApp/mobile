import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {defaultColor, defaultSize, IconProps} from "../interface/icon-constants.interface";


const ChevronUp: React.FC<IconProps> = (props) => {

    // Set Default Props
    const color = props.color || defaultColor;
    const size = props.size || defaultSize;
    const strokeWidth = props.strokeWidth || 2;

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
                <Path d="M18 15l-6-6-6 6"/>
            </G>
        </Svg>
    );
}

export default ChevronUp;
