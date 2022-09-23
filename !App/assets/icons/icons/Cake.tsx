import * as React from "react"
import Svg, {G, Path} from "react-native-svg"
import {
    defaultColor,
    defaultFill,
    defaultSize,
    defaultStrokeWidth,
    IconProps
} from "../interface/icon-constants.interface";


//@ts-ignore
const Cake: React.FC<IconProps> = (props) => {

    // Set Default Props
    const fill = props.fill || defaultFill;
    const color = props.color || defaultColor;
    const size = props.size || defaultSize;
    const strokeWidth = props.strokeWidth || defaultStrokeWidth;
    const sizeMultiplier = fill ? 1.1 : 1;

    return (
        <Svg
            width={size * sizeMultiplier}
            height={size * sizeMultiplier}
            viewBox="0 0 18 24">
            <G
                strokeWidth={strokeWidth}
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M-3 0h24v24H-3z"/>
                <Path
                    d="M9.68 5.88c.7-.24 1.22-.9 1.3-1.64.05-.47-.05-.91-.28-1.27L9.42.75a.506.506 0 00-.87 0L7.27 2.97C7.1 3.27 7 3.62 7 4c0 1.32 1.3 2.35 2.68 1.88zm3.85 10.04l-1-1-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C3.75 16.64 2.88 17 1.96 17c-.73 0-1.4-.23-1.96-.61V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.61c-.75.51-1.71.75-2.74.52-.66-.14-1.25-.51-1.73-.99zM15 9h-5V8c0-.55-.45-1-1-1s-1 .45-1 1v1H3c-1.66 0-3 1.34-3 3v1.46c0 .85.5 1.67 1.31 1.94.73.24 1.52.06 2.03-.46l2.14-2.13 2.13 2.13c.76.76 2.01.76 2.77 0l2.14-2.13 2.13 2.13c.43.43 1.03.63 1.65.55.99-.13 1.69-1.06 1.69-2.06v-1.42A2.983 2.983 0 0015 9z"
                    fill={fill ? color : 'none'}
                    stroke={fill ? 'none' : color}
                />
            </G>
        </Svg>
    );
}

export default Cake;
