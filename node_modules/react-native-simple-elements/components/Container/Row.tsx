import * as React from "react";
import { screenSize } from "./utils/ScreenSize";
import { isHidden } from "./utils/helpers";
import { View } from "react-native";

const cloneElements = (props) => {
    //if size doesn't exist or is 0 default to 12
    const rowSize = props.size > 0 ? props.size : 12;

    return React.Children.map(props.children, (element) => {
        return React.cloneElement(element, { rowSize: rowSize });
    });
};

type Props = {
    size?: number,
    nowrap?: boolean,
    smHidden?: boolean,
    mdHidden?: boolean,
    lgHidden?: boolean,
    style?: any,
    alignItems?: string,
    justifyContent?: string,
    children: React.ReactNode,
};

const Row = (props: Props) => {
    if (isHidden(screenSize, props)) {
        return null;
    } else {
        return (
            <View 
                {...props}
                style={[props.style,
                    {
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: props.nowrap ? "nowrap" : "wrap",
                        alignItems: props.alignItems,
                        justifyContent: props.justifyContent,
                        backgroundColor: "transparent",
                    }]
                }
                testID="row"
            >
                {cloneElements(props)}
            </View>
        );
    }
};

export default Row;
