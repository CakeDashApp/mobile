export const isNotAtTop = ({contentOffset}: { contentOffset: any }) => {
    const paddingToTop = 10;

    return contentOffset.y > paddingToTop;
};

//https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: { layoutMeasurement: any, contentOffset: any, contentSize: any }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
