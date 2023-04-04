import * as React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>,
};

const AbsoluteView = ({
    children,
    style,
}: Props) => {

    return (
        <View
            style={[
                style,
                styles.container,
            ]}
        >
            {children}
        </View>
    );
};

export default AbsoluteView;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
});
