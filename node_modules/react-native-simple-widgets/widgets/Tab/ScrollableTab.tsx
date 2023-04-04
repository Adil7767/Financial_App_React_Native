import * as React from "react";
import { FlatList, Pressable, StyleProp, StyleSheet, View } from "react-native";
import Text from "react-native-simple-elements/components/Text";

type Props = {
    options: Record<string, any>[],
    onItemPress?: (item, index?) => void,
    height?: number,
    style?: StyleProp<View>,
};

const defaultProps = {
    options: [],
    height: 56,
};

const ScrollableTab = (props: Props) => {

    const {
        options,
        onItemPress,
        height,
        style,
    } = props;

    const _handleItemPress = (item, index) => {
        if (typeof onItemPress === "function") {
            onItemPress(item, index);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <Pressable
                key={index}
                onPress={() => _handleItemPress(item, index)}
            >
                <Text>{`${item.label}`}</Text>
            </Pressable>
        );
    };

    return (
        <FlatList
            horizontal={true}
            data={options}
            renderItem={renderItem}
            style={StyleSheet.flatten<any>([
                style,
                { height, },
            ])}
        />
    );
};

ScrollableTab.defaultProps = defaultProps;

export default ScrollableTab;
