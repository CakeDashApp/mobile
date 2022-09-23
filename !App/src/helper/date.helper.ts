import * as RNLocalize from "react-native-localize";

export const formatDateToDeviceDateString = (date: Date, showTime?: boolean | string): string => {
    const _showTime = showTime !== undefined ? showTime : 'hh:mm:ss';

    // Get Date
    const tempDate = new Date(date.toLocaleString("en-US", {timeZone: RNLocalize.getTimeZone()}));

    // Date (String)
    const dateString = `${(tempDate.getMonth() + 1).toString().padStart(2, '0')}/${
        tempDate.getDate().toString().padStart(2, '0')}/${
        tempDate.getFullYear().toString().padStart(4, '0')}`;

    // Time (String)
    const hours = tempDate.getHours().toString().padStart(2, '0');
    const minutes = tempDate.getMinutes().toString().padStart(2, '0');
    const seconds = tempDate.getSeconds().toString().padStart(2, '0');
    let timeString = typeof _showTime === 'string' && _showTime.replace('hh', hours).replace('mm', minutes).replace('ss', seconds);

    return _showTime ? (dateString + " " + timeString) : dateString;
}
