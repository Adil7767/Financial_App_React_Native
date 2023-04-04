import useScreenSize from "../hooks/useScreenSize";
import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
}

const FlexResponsiveContainer = ({
    style,
    children,
}: Props) => {

    const { isMobileView } = useScreenSize();

    return (
        <View
            style={[
                styles.container,
                style,
                {
                    flexDirection: isMobileView ? "column" : "row",
                },
            ]}
        >
            {children}
        </View>
    );
};

export default FlexResponsiveContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        display: "flex",
    },
});
