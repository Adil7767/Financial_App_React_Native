import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
}

const ContainerFluid = ({
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

export default ContainerFluid;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        width: "100%",
        backgroundColor: "transparent",
    },
});
