import * as React from "react"
import Svg, {Circle, G, Path} from "react-native-svg"
import {
    defaultBackgroundColor,
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Compass: React.FC<IconProps> = (props) => {

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
            viewBox="0 0 22 22"
        >
            <G
                transform="translate(1 1)"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Circle
                    cx={10}
                    cy={10}
                    r={10}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill={fill ? color : 'none'}
                />
                <Path
                    stroke={fill ? backgroundColor : color}
                    strokeWidth={strokeWidth * 2}
                    d="M14.48 6l-2.12 6.36L6 14.48l2.12-6.36z"
                />
            </G>
        </Svg>
    );
}

export default Compass;
