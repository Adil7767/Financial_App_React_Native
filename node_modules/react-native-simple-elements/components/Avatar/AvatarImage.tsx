import * as React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
    ViewStyle,
    StyleProp,
} from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";

const defaultSize = 64;

export type AvatarImageSource =
    | ImageSourcePropType
    | ((props: { size: number }) => React.ReactNode);

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Image to display for the `Avatar`.
     * It accepts a standard React Native Image `source` prop
     * Or a function that returns an `Image`.
     */
    source: AvatarImageSource;
    /**
     * Size of the avatar.
     */
    size?: number;

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
 *     <img class="medium" src="screenshots/avatar-image.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { AvatarImage } from 'react-native-simple-elements/components/Avatar';
 *
 * const MyComponent = () => (
 *   <Avatar.Image size={24} source={require('../assets/avatar.png')} />
 * );
 * export default MyComponent
 * ```
 */
const AvatarImage = ({
    size = defaultSize,
    source,
    style,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const { colors } = theme;

    const { backgroundColor = colors.primary } = StyleSheet.flatten(style) || {};

    return (
        <View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                style,
            ]}
            {...rest}
        >
            {typeof source === "function" && source({ size })}
            {typeof source !== "function" && (
                <Image
                    source={source}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                />
            )}
        </View>
    );
};

AvatarImage.displayName = "Avatar.Image";

export default AvatarImage;
