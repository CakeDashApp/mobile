//@ts-ignore
export const allowLogging: boolean = (typeof atob !== 'undefined');//Check if DebugMode is Enabled


//======================================================================================================================
// Firebase Logs
//======================================================================================================================

export const sendFirebaseLog = (log: string) => {
    if (allowLogging) {
        console.log('%cFirebase: ' + log, 'color: orange;');
    }
};

//======================================================================================================================
// Core Logs
//======================================================================================================================

export const sendCoreLog = (log: string, object?: object) => {
    if (allowLogging) {
        console.log('%cCore: ' + log, 'color: pink;');
        if (object)
            sendTable(object);
    }
};

//======================================================================================================================
// Listener Logs
//======================================================================================================================

export const sendListenerLog = (log: string) => {
    if (allowLogging) {
        console.log('%cListener: ' + log, 'color: yellow;');
    }
};



//======================================================================================================================
//Error
//======================================================================================================================

export const sendError = (log: string, e: object | null) => {
    if (allowLogging) {
        console.log('%cError: ' + log, 'color: red; font-weight: bold');

        if (e !== null) {
            console.log(e);
        }
    }
};


//======================================================================================================================
//Table
//======================================================================================================================

export const sendTable = (object: object) => {
    //@ts-ignore
    const isDebuggingEnabled = (typeof atob !== 'undefined');
    if (allowLogging && isDebuggingEnabled) {
        console.table(object);
    } else {
        sendError('Can\'t send tables in none DebugMode!', null);
    }
};


//======================================================================================================================
//Colorful Log
//======================================================================================================================

export const sendColorfulText = (text: string, color: string) => {
    if (allowLogging) {
        console.log('%c' + text, 'color: ' + color + ';');
    }
};


//======================================================================================================================
//Normal Log
//======================================================================================================================

export const sendText = (text: string) => {
    if (allowLogging) {
        console.log(text);
    }
};


//======================================================================================================================
//Issue Log
//======================================================================================================================

export const sendIssue = (text: string, issue: number) => {
    const color = '#BD00FF';

    if (allowLogging) {
        console.log('%cI(' + issue + '): ' + text, 'color: ' + color + ';');
    }
};

