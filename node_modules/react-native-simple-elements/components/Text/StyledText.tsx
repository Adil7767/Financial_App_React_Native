
import color from "color";
import * as React from "react";
import { I18nManager, StyleProp, TextStyle, StyleSheet } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import Text from "./Text";

type Props = React.ComponentProps<typeof Text> & {
    alpha: number;
    family: "regular" | "medium" | "light" | "thin";
    style?: StyleProp<TextStyle>;
    theme?: DefaultTheme;
};

const StyledText = ({ alpha, family, style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);
    const textColor = color(theme.colors.text).alpha(alpha).rgb().string();
    const font = theme.fonts[family];
    const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

    return (
        <Text
            {...rest}
            style={[
                styles.text,
                { color: textColor, ...font, writingDirection },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: "left",
    },
});

export default StyledText;
