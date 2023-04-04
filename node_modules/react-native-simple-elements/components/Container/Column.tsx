import * as React from "react";
import useScreenSize from "./utils/useScreenSize";
import { isHidden, getComponentWidth, getComponentOffset } from "./utils/helpers";
import { View } from "react-native";

type Props = {
    sm?: number,
    smOffset?: number,
    smHidden?: boolean,
    md?: number,
    mdOffset?: number,
    mdHidden?: boolean,
    lg?: number,
    lgOffset?: number,
    lgHidden?: boolean,
    rowSize?: number,
    style?: any,
    children: React.ReactNode,
};

const Column = (props: Props) => {
    const {
        sm,
        smOffset,
        smHidden,
        md,
        mdOffset,
        mdHidden,
        lg,
        lgOffset,
        lgHidden,
        rowSize,
        ...rest
    } = props;

    const gridProps = {
        sm,
        smOffset,
        smHidden,
        md,
        mdOffset,
        mdHidden,
        lg,
        lgOffset,
        lgHidden,
        rowSize
    };

    const { screenSizeType } = useScreenSize();

    if (isHidden(screenSizeType, gridProps)) {
        return null;
    } else {
        return (
            <View
                {...rest}
                style={[
                    props.style,
                    {
                        display: "flex",
                        width: getComponentWidth(screenSizeType, gridProps),
                        flexDirection: "column",
                        backgroundColor: "transparent",
                        marginLeft: getComponentOffset(screenSizeType, gridProps)
                    }]
                }
                testID="column"
            >
                {rest.children}
            </View>
        );
    }
};

export default Column;
