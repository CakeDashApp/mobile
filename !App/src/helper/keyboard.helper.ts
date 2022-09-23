import {Keyboard, KeyboardEvent, Platform} from 'react-native';
import core from "../core";

// Keyboard Listener
let keyboardDidShowListener: any;
let keyboardWillShowListener: any;
let keyboardWillHideListener: any;
let keyboardDidHideListener: any;


//======================================================================================================================
// Start Listener
//======================================================================================================================

export const startListener = () => {

    // The Perfect Listener is the Will.. listener but on android this listener doesn't exist!
    if (Platform.OS === 'ios') {
        keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                core.ui.actions.setKeyboardIsVisible(false);
            }
        );

        keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            (e: KeyboardEvent) => {
                core.ui.actions.setKeyboardHeight(e.endCoordinates.height);
                core.ui.actions.setKeyboardIsVisible(true);
            }
        );
    }

    if (Platform.OS === 'android') {
        keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                core.ui.actions.setKeyboardIsVisible(false);
            }
        );

        keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e: KeyboardEvent) => {
                core.ui.actions.setKeyboardHeight(e.endCoordinates.height);
                core.ui.actions.setKeyboardIsVisible(true);
            }
        );
    }
};


//======================================================================================================================
// Remove Listener
//======================================================================================================================

export const removeListener = () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
};

