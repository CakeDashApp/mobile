import React from "react";
import { Platform, TouchableOpacity } from "react-native";
// @ts-ignore
import AbsoluteTouchableOpacity from "react-native-gesture-handler/touchables/TouchableOpacity";

interface Props {
    absolute: boolean;
    onPress: () => void;
}

const ModalTrigger: React.FC<Props> = (props) => {
    // Props
    const { absolute, onPress } = props;

    //======================================================================================================================
    // Render
    //======================================================================================================================

    return Platform.OS === "android" && absolute ? (
        <AbsoluteTouchableOpacity onPress={onPress}>
            {props.children}
        </AbsoluteTouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>{props.children}</TouchableOpacity>
    );
};

export default ModalTrigger;
