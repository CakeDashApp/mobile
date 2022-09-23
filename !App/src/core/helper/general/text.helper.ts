export const shortText = (text: string, maxLength: number, toLongEndString?: string): string => {
    const endString = toLongEndString ? toLongEndString : '..';
    let shortText;

    if (text.length === maxLength || (text.length + 1 === maxLength)) {
        shortText = text;
    } else {
        shortText = text.substring(0, maxLength - 1) + ((text.length) > maxLength ? endString : '')
    }

    return shortText;
}
