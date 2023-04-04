import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
}

const FlexContainer = ({
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

export default FlexContainer;

const styles = StyleSheet.create({
    container: {
        width: "992px",
        maxWidth: "100%",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        flexWrap: "nowrap",
    },
});
