export const generateId = () => {
    const dateIntString = new Date(new Date().toString()).getTime().toString();
    const randomIntString = Math.floor(Math.random() * Math.floor(10000000)).toString();

    return dateIntString + randomIntString;
};
