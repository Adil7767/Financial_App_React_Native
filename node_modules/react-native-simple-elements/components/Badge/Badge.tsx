import * as React from "react";
import { Animated, StyleSheet, StyleProp, TextStyle } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import color from "color";
import { black, white } from "../theme/colors";

const defaultSize = 20;

type Props = React.ComponentProps<typeof Animated.Text> & {
    /**
     * Whether the badge is visible
     */
    visible: boolean;
    /**
     * Content of the `Badge`.
     */
    children?: string | number;
    /**
     * Size of the `Badge`.
     */
    size?: number;

    style?: StyleProp<TextStyle>;

    ref?: React.RefObject<typeof Animated.Text>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * Badges are small status descriptors for UI elements.
 * A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/badge-1.png" />
 *     <figcaption>Badge with content</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/badge-2.png" />
 *     <figcaption>Badge without content</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import Badge from 'react-native-simple-elements/components/Badge';
 *
 * const MyComponent = () => (
 *   <Badge>3</Badge>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Badge = ({
    children,
    size = defaultSize,
    style,
    visible = true,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const { current: opacity } = React.useRef<Animated.Value>(
        new Animated.Value(visible ? 1 : 0)
    );
    const isFirstRendering = React.useRef<boolean>(true);

    const {
        animation: { scale },
    } = theme;

    React.useEffect(() => {
        // Do not run animation on very first rendering
        if (isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        }

        Animated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 150 * scale,
            useNativeDriver: true,
        }).start();
    }, [visible, opacity, scale]);

    const {
        backgroundColor = theme.colors.notification,
        ...restStyle
    } = StyleSheet.flatten(style) as any || {};
    const textColor = color(backgroundColor).isLight() ? black : white;

    const borderRadius = size / 2;

    return (
        // @ts-ignore
        <Animated.Text
            numberOfLines={1}
            style={[
                {
                    opacity,
                    backgroundColor,
                    color: textColor,
                    fontSize: size * 0.5,
                    ...theme.fonts.regular,
                    lineHeight: size,
                    height: size,
                    minWidth: size,
                    borderRadius,
                },
                {
                    alignSelf: "flex-end",
                    textAlign: "center",
                    textAlignVertical: "center",
                    paddingHorizontal: 4,
                    overflow: "hidden",
                },
                restStyle,
            ]}
            {...rest}
        >
            {children}
        </Animated.Text>
    );
};

export default Badge;
