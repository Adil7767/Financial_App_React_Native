
import * as React from "react";
import {
    View,
    ViewStyle,
    StyleSheet,
    StyleProp,
    TextStyle,
} from "react-native";
import Color from "color";
import Text from "../Text";
import { white } from "../theme/colors";
import { DefaultTheme, ThemeContext } from "styled-components";

const defaultSize = 64;

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Initials to show as the text in the `Avatar`.
     */
    label: string;
    /**
     * Size of the avatar.
     */
    size?: number;
    /**
     * Custom color for the text.
     */
    color?: string;
    /**
     * Style for text container
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Style for the title.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-text.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { AvatarText } from 'react-native-simple-elements/components/Avatar';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const AvatarText = ({
    label,
    size = defaultSize,
    style,
    labelStyle,
    color,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const { backgroundColor = theme.colors.primary, ...restStyle } =
        StyleSheet.flatten(style) || {};
    const textColor =
        color || (Color(backgroundColor as any).isLight() ? "rgba(0, 0, 0, .54)" : white);

    return (
        <View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                styles.container,
                restStyle,
            ]}
            {...rest}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: textColor,
                        fontSize: size / 2,
                        lineHeight: size,
                    },
                    labelStyle,
                ]}
                numberOfLines={1}
            >
                {label}
            </Text>
        </View>
    );
};

AvatarText.displayName = "Avatar.Text";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        textAlignVertical: "center",
    },
});

export default AvatarText;
