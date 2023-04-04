import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

// const sliderRadius = 3;
const width = 50;

type Props = {
    oneMarkerValue?: string | number,
    twoMarkerValue?: string | number,
    oneMarkerLeftPosition?: number,
    twoMarkerLeftPosition?: number,
    oneMarkerPressed?: boolean,
    twoMarkerPressed?: boolean,
};

export default class DefaultLabel extends React.Component<Props> {

    render() {
        const {
            oneMarkerValue,
            twoMarkerValue,
            oneMarkerLeftPosition,
            twoMarkerLeftPosition,
            oneMarkerPressed,
            twoMarkerPressed,
        } = this.props;

        return (
            <View style={{ position: "relative" }}>
                {Number.isFinite(oneMarkerLeftPosition) &&
                    Number.isFinite(oneMarkerValue) && (
                    <View
                        style={[
                            styles.sliderLabel,
                            { left: oneMarkerLeftPosition - width / 2 },
                            oneMarkerPressed && styles.markerPressed,
                        ]}
                    >
                        <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
                    </View>
                )}

                {Number.isFinite(twoMarkerLeftPosition) &&
                    Number.isFinite(twoMarkerValue) && (
                    <View
                        style={[
                            styles.sliderLabel,
                            { left: twoMarkerLeftPosition - width / 2 },
                            twoMarkerPressed && styles.markerPressed,
                        ]}
                    >
                        <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sliderLabel: {
        position: "absolute",
        bottom: 0,
        minWidth: width,
        padding: 8,
        backgroundColor: "#f1f1f1",
    },
    sliderLabelText: {
        alignItems: "center",
        textAlign: "center",
        fontStyle: "normal",
        fontSize: 11,
    },
    markerPressed: {
        borderWidth: 2,
        borderColor: "#999",
    },
});
