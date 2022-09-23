import * as React from "react"
import Svg, {Path, Circle, G} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const User: React.FC<IconProps> = (props) => {

    // Set Default Props
    const fill = props.fill || defaultFill;
    const color = props.color || defaultColor;
    const size = props.size || defaultSize;
    const strokeWidth = props.strokeWidth || defaultStrokeWidth;

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 18 20">
            <G
                transform="translate(1 1)"
                stroke={color}
                strokeWidth={strokeWidth}
                fill={fill ? color : 'none'}
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"
                      fill={fill ? color : 'none'}
                />
                <Circle cx={8} cy={4} r={4}/>
            </G>
        </Svg>
    );
}

export default User;
