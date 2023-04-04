import * as React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    IconBadge: {
        position: "absolute",
        top: 1,
        right: 1,
        minWidth: 20,
        height: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF0000",
    },
});

type Props = {
    MainElement: React.ReactElement,
    BadgeElement: React.ReactElement,
    MainViewStyle?: Record<string, any>,
    IconBadgeStyle?: Record<string, any>,
    Hidden?: boolean,
};

export default class IconBadge extends React.PureComponent<Props> {
    
    static defaultProps = {
        MainViewStyle: {},
        IconBadgeStyle: {},
        Hidden: true,
    };
    state = {};

    render() {
        const {
            MainViewStyle,
            MainElement,
            Hidden,
            IconBadgeStyle,
            BadgeElement,
        } = this.props;
        return (
            <View style={[MainViewStyle || {}]}>
                {MainElement}
                {!Hidden && (
                    <View style={[styles.IconBadge, IconBadgeStyle || {}]}>
                        {BadgeElement}
                    </View>
                )}
            </View>
        );
    }
}