import * as React from "react";

import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

import CheckboxAndroid from "./CheckboxAndroid";
import CheckboxIOS from "./CheckboxIOS";
import Text from "../Text";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { DefaultTheme, ThemeContext } from "styled-components";

type Props = {
    /**
     * Status of checkbox.
     */
    status: "checked" | "unchecked" | "indeterminate";
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * Additional styles for container View.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * Whether `<Checkbox.Android />` or `<Checkbox.IOS />` should be used.
     * Left undefined `<Checkbox />` will be used.
     */
    mode?: "android" | "ios";

    textAfterButton?: boolean;
};

/**
 * Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import Checkbox from 'react-native-simple-elements/components/Checkbox';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Checkbox.Item label="Item" status="checked" />
 *   </View>
 * );
 *
 * export default MyComponent;
 *```
 */

const CheckboxItem = ({
    style,
    status,
    label,
    onPress,
    labelStyle,
    testID,
    mode,
    textAfterButton,
    ...props
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const checkboxProps = { ...props, status, theme };
    let checkbox;

    if (mode === "android") {
        checkbox = <CheckboxAndroid {...checkboxProps} />;
    } else if (mode === "ios") {
        checkbox = <CheckboxIOS {...checkboxProps} />;
    } else {
        checkbox = <CheckboxAndroid {...checkboxProps} />;
    }

    return (
        <TouchableRipple onPress={onPress} testID={testID}>
            <View style={[styles.container, style]} pointerEvents="none">
                {!textAfterButton ?
                    <Text style={[styles.label, { color: theme.colors.text }, labelStyle]}>
                        {label}
                    </Text> : null
                }
                {checkbox}
                {textAfterButton ?
                    <Text style={[styles.label, { color: theme.colors.text }, labelStyle]}>
                        {label}
                    </Text> : null
                }
            </View>
        </TouchableRipple>
    );
};

CheckboxItem.displayName = "Checkbox.Item";

export default CheckboxItem;

// @component-docs ignore-next-line
const CheckboxItemWithTheme = CheckboxItem;
// @component-docs ignore-next-line
export { CheckboxItemWithTheme as CheckboxItem };

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 16,
        paddingRight: 16,
        paddingLeft: 16,
    },
    label: {
        fontSize: 16,
        flex: 1,
    },
});
