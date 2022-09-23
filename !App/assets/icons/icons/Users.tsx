import * as React from "react"
import Svg, {Path, Circle, G} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Users: React.FC<IconProps> = (props) => {

    // Set Default Props
    const fill = props.fill || defaultFill;
    const color = props.color || defaultColor;
    const size = props.size || defaultSize;
    const strokeWidth = props.strokeWidth || defaultStrokeWidth;

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24">
            <G
                transform="translate(1 1)"
                stroke={color}
                strokeWidth={strokeWidth}
                fill={fill ? color : 'none'}
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <Circle cx={9} cy={7} r={4}/>
                <Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </G>
        </Svg>
    );
}

export default Users;
