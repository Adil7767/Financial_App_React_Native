import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
}

const FlexColumnCenterContainer = ({
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

export default FlexColumnCenterContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
});
