import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SUPPORTED_PERCENTAGE_RATIOS } from "./utils";

type Props = {
    width: number | string,
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>,
    ratio?: string,
}

const defaultProps = {
    ratio: SUPPORTED_PERCENTAGE_RATIOS.WH_36x9,
};

const RatioBox = ({
    width,
    style,
    children,
    ratio,
}: Props) => {

    return (
        <View
            style={[
                style,
                {
                    width: width,
                    paddingTop: ratio,
                },
            ]}
        >
            {children}
        </View>
    );
};

RatioBox.defaultProps = defaultProps;

export default RatioBox;
