import * as React from "react";
import { useWindowDimensions } from "react-native";

const mobileBreakPoint = parseFloat("640px".replace("px", ""));

const useScreenSize = () => {

    const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();

    const [ width, setWidth ] = React.useState(viewportWidth);
    const [ height, setHeight ] = React.useState(viewportHeight);
    const [ screenSizeType, setScreenSizeType ] = React.useState("small");
    const [ isMobileView, setMobileView ] = React.useState(
        viewportWidth < mobileBreakPoint
    );

    React.useEffect(() => {
        function updateSize() {
            setWidth(viewportWidth);
            setHeight(viewportHeight);
            setMobileView(viewportWidth < mobileBreakPoint);

            const SC_SM_WIDTH = 640;
            const SC_LG_WIDTH = 1024;

            if (viewportWidth < SC_SM_WIDTH) {
                setScreenSizeType("small");
            }
            if (viewportWidth >= SC_SM_WIDTH && viewportWidth < SC_LG_WIDTH) {
                setScreenSizeType("medium");
            }
            if (viewportWidth >= SC_LG_WIDTH) {
                setScreenSizeType("large");
            }
        }
        updateSize();
    }, [ viewportWidth ]);

    return { width, height, screenSizeType, isMobileView };
};

export default useScreenSize;
