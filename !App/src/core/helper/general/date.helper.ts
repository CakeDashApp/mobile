export const formatDateToUTC = (date: Date): string => {
    return date.toUTCString();
}

export const sleep = async (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const addHours = (date: Date, hours: number): Date => {
    const newDate = new Date();
    newDate.setHours(date.getHours() + hours);
    return newDate;
}
