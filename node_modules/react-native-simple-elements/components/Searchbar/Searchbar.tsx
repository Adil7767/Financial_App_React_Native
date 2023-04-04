import * as React from "react";
import {
    StyleSheet,
    StyleProp,
    TextInput,
    I18nManager,
    ViewStyle,
    TextStyle,
} from "react-native";
import color from "color";
import IconButton from "../IconButton";
import Surface from "../Surface";
import { DefaultTheme, ThemeContext } from "styled-components";
import MagnifyIcon from "@mdi/svg/svg/magnify.svg";
import CloseIcon from "@mdi/svg/svg/close.svg";

type Props = React.ComponentPropsWithRef<typeof TextInput> & {
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    clearAccessibilityLabel?: string;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    searchAccessibilityLabel?: string;
    /**
     * Hint text shown when the input is empty.
     */
    placeholder?: string;
    /**
     * The value of the text input.
     */
    value: string;
    /**
     * Icon name for the left icon button (see `onIconPress`).
     */
    icon?: React.ReactElement;
    /**
     * Callback that is called when the text input's text changes.
     */
    onChangeText?: (query: string) => void;
    /**
     * Callback to execute if we want the left icon to act as button.
     */
    onIconPress?: () => void;
    /**
     * Set style of the TextInput component inside the searchbar
     */
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;

    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * Custom color for icon, default will be derived from theme
     */
    iconColor?: string;
    /**
     * Custom icon for clear button, default will be icon close
     */
    clearIcon?: React.ReactElement;
};

type TextInputHandles = Pick<
    TextInput,
    "setNativeProps" | "isFocused" | "clear" | "blur" | "focus"
>;

/**
 * Searchbar is a simple input box where users can type search queries.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/searchbar.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import Searchbar from 'react-native-simple-elements/components/Searchbar';
 *
 * const MyComponent = () => {
 *   const [searchQuery, setSearchQuery] = React.useState('');
 *
 *   const onChangeSearch = query => setSearchQuery(query);
 *
 *   return (
 *     <Searchbar
 *       placeholder="Search"
 *       onChangeText={onChangeSearch}
 *       value={searchQuery}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Searchbar = React.forwardRef<TextInputHandles, Props>(
    (
        {
            clearAccessibilityLabel = "clear",
            clearIcon,
            icon,
            iconColor: customIconColor,
            inputStyle,
            onIconPress,
            placeholder,
            searchAccessibilityLabel = "search",
            style,
            value,
            ...rest
        }: Props,
        ref
    ) => {
        const root = React.useRef<TextInput>(null);
        const theme = React.useContext(ThemeContext);

        React.useImperativeHandle(ref, () => ({
            // @ts-ignore
            focus: root.current?.focus,
            // @ts-ignore
            clear: root.current?.clear,
            setNativeProps: (args: Record<string, any>) => root.current?.setNativeProps(args),
            // @ts-ignore
            isFocused: root.current?.isFocused,
            // @ts-ignore
            blur: root.current?.blur,
        }));

        const handleClearPress = () => {
            root.current?.clear();
            rest.onChangeText?.("");
        };

        const { colors, roundness, dark, fonts } = theme;
        const textColor = colors.text;
        const font = fonts.regular;
        const iconColor =
            customIconColor ||
            (dark ? textColor : color(textColor).alpha(0.54).rgb().string());
        const rippleColor = color(textColor).alpha(0.32).rgb().string();

        return (
            <Surface
                style={[
                    { borderRadius: roundness, elevation: 4 },
                    styles.container,
                    style,
                ]}
            >
                <IconButton
                    // accessibilityTraits="button"
                    // accessibilityComponentType="button"
                    accessibilityRole="button"
                    borderless
                    rippleColor={rippleColor}
                    onPress={onIconPress}
                    color={iconColor}
                    size={24}
                    // direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
                    icon={icon || MagnifyIcon}
                    accessibilityLabel={searchAccessibilityLabel}
                />
                <TextInput
                    style={[styles.input, { color: textColor, ...font }, inputStyle]}
                    placeholder={placeholder || ""}
                    placeholderTextColor={colors.placeholder}
                    selectionColor={colors.primary}
                    underlineColorAndroid="transparent"
                    returnKeyType="search"
                    keyboardAppearance={dark ? "dark" : "light"}
                    // accessibilityTraits="search"
                    accessibilityRole="search"
                    ref={root}
                    value={value}
                    {...rest}
                />
                <IconButton
                    borderless
                    disabled={!value}
                    accessibilityLabel={clearAccessibilityLabel}
                    color={value ? iconColor : "rgba(255, 255, 255, 0)"}
                    size={24}
                    // direction={I18nManager.isRTL ? "rtl" : "ltr"}
                    rippleColor={rippleColor}
                    onPress={handleClearPress}
                    icon={clearIcon || CloseIcon}
                    // accessibilityTraits="button"
                    // accessibilityComponentType="button"
                    accessibilityRole="button"
                />
            </Surface>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 8,
        alignSelf: "stretch",
        textAlign: I18nManager.isRTL ? "right" : "left",
        minWidth: 0,
    },
});

export default Searchbar;
