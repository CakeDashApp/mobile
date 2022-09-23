import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultSize, defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


const FileText: React.FC<IconProps> = (props) => {

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
                <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
            </G>
        </Svg>
    );
}

export default FileText;
