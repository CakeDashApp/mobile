import * as React from "react"
import Svg, {Path, G} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const Star: React.FC<IconProps> = (props) => {

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
                <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill={fill ? typeof fill === 'string' ? fill : color : 'none'}
                />
            </G>
        </Svg>
    );
}

export default Star;
