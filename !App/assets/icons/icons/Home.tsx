import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultBackgroundColor,
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Home: React.FC<IconProps> = (props) => {

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
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      fill={fill ? color : backgroundColor}
                />
                <Path d="M9 22V12h6v10"
                      strokeWidth={strokeWidth * 2}
                      fill="none"
                      stroke={fill ? backgroundColor : color}
                />
            </G>
        </Svg>
    );
}

export default Home;
