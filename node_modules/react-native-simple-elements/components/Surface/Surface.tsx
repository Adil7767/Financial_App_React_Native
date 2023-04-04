import * as React from "react";
import { Animated, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import shadow from "../theme/shadow";
import overlay from "../theme/overlay";

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Content of the `Surface`.
     */
    children: React.ReactNode;

    style?: StyleProp<ViewStyle>;

    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * Surface is a basic container that can give depth to an element with elevation shadow.
 * On dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay over a component surface.
 * Overlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.
 *
 * <div class="screenshots">
 *   <img src="screenshots/surface-1.png" />
 *   <img src="screenshots/surface-2.png" />
 *   <img src="screenshots/surface-3.png" />
 * </div>
 *
 * <div class="screenshots">
 *   <img src="screenshots/surface-dark-1.png" />
 *   <img src="screenshots/surface-dark-2.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import Surface from 'react-native-simple-elements/components/Surface';
 * import Text from "react-native-simple-elements/components/Text";
 * import { StyleSheet } from 'react-native';
 *
 * const MyComponent = () => (
 *   <Surface style={styles.surface}>
 *      <Text>Surface</Text>
 *   </Surface>
 * );
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   surface: {
 *     padding: 8,
 *     height: 80,
 *     width: 80,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     elevation: 4,
 *   },
 * });
 * ```
 */
const Surface = ({ style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);

    const flattenedStyles = StyleSheet.flatten(style) || {};
    const { elevation = 4 }: ViewStyle = flattenedStyles;
    const { dark: isDarkTheme, mode, colors } = theme;

    return (
        // @ts-ignore
        <Animated.View
            {...rest}
            style={[
                {
                    backgroundColor:
                        isDarkTheme && mode === "adaptive"
                            ? overlay(elevation, colors.surface)
                            : colors.surface,
                },
                elevation && shadow(elevation),
                style,
            ]}
        />
    );
};

export default Surface;
