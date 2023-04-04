import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
}

const FlexRowCenterContainer = ({
    style,
    children,
}: Props) => {

    return (
        <View
            style={[
                styles.container,
                style,
            ]}
        >
            {children}
        </View>
    );
};

export default FlexRowCenterContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
