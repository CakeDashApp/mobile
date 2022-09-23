import * as React from "react"
import Svg, {Circle, G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const UserPlus: React.FC<IconProps> = (props) => {

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
                <Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <Circle cx={8.5} cy={7} r={4}/>
                <Path d="M20 8v6M23 11h-6"/>
            </G>
        </Svg>
    );
}

export default UserPlus;
