import * as React from "react";
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";
import color from "color";
import { SvgIcon } from "../Icon";
import { white } from "../theme/colors";
import { DefaultTheme, ThemeContext } from "styled-components";

const defaultSize = 64;

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Icon to display for the `Avatar`.
     */
    icon: React.ReactElement;
    /**
     * Size of the avatar.
     */
    size?: number;
    /**
     * Custom color for the icon.
     */
    color?: string;
    style?: StyleProp<ViewStyle>;
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
 *     <img class="medium" src="screenshots/avatar-icon.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { AvatarIcon } from 'react-native-simple-elements/components/Avatar';
 *
 * const MyComponent = () => (
 *   <AvatarIcon size={24} icon="folder" />
 * );
 * ```
 */
const Avatar = ({ icon, size = defaultSize, style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);
    const { backgroundColor = theme.colors.primary, ...restStyle } =
        StyleSheet.flatten(style) || {};
    const textColor =
        rest.color ||
        (color(backgroundColor as any).isLight() ? "rgba(0, 0, 0, .54)" : white);

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
            <SvgIcon icon={icon} color={textColor} size={size * 0.6} />
        </View>
    );
};

Avatar.displayName = "Avatar.Icon";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Avatar;
