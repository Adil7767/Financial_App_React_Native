
const calculateViewMeasure = (myViewRef, { wWidth, wHeight }, effect) => {
    if (myViewRef.current) {
        myViewRef.current.measure((x, y, width, height, pageX, pageY) => {
            const scrollInfo = {
                rectTop: pageY,
                rectBottom: pageY + height,
                rectWidth: pageX + width,
            };

            const isVisible =
                scrollInfo.rectBottom != 0 &&
                scrollInfo.rectTop >= 0 &&
                scrollInfo.rectBottom <= wHeight &&
                scrollInfo.rectWidth > 0 &&
                scrollInfo.rectWidth <= wWidth;

            effect(isVisible);
        });
    }
};

export default calculateViewMeasure;
