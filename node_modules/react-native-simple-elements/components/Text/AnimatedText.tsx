import * as React from "react";
import {
    Animated,
    TextStyle,
    I18nManager,
    StyleProp,
    StyleSheet,
} from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";

type Props = React.ComponentPropsWithRef<typeof Animated.Text> & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
     theme?: DefaultTheme;
};

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
function AnimatedText({ style, ...rest }: Props) {
    const theme = React.useContext(ThemeContext);
    const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

    return (
        <Animated.Text
            {...rest}
            style={[
                styles.text,
                {
                    ...theme.fonts.regular,
                    color: theme.colors.text,
                    writingDirection,
                },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: "left",
    },
});

export default AnimatedText;
