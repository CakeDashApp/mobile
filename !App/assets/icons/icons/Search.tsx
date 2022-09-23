import * as React from "react"
import Svg, {Circle, G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Search: React.FC<IconProps> = (props) => {

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
                fill={fill ? color : 'none'}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Circle cx={11} cy={11} r={8}/>
                <Path d="M21 21l-4.35-4.35"/>
            </G>
        </Svg>
    );
}

export default Search;
