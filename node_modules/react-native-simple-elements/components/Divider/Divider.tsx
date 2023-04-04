import * as React from "react";
import color from "color";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import { black, white } from "../theme/colors";
import type { $RemoveChildren } from "../types";

type Props = $RemoveChildren<typeof View> & {
    /**
     *  Whether divider has a left inset.
     */
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * <div class="screenshots">
 *  <figure>
 *    <img class="medium" src="screenshots/divider.png" />
 *  </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import Divider from 'react-native-simple-elements/components/Divider';
 * import Text from "react-native-simple-elements/components/Text";
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Lemon</Text>
 *     <Divider />
 *     <Text>Mango</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Divider = ({ inset, style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);
    const { dark: isDarkTheme } = theme;
    return (
        <View
            {...rest}
            style={[
                isDarkTheme ? styles.dark : styles.light,
                inset && styles.inset,
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    light: {
        backgroundColor: color(black).alpha(0.12).rgb().string(),
        height: StyleSheet.hairlineWidth,
    },
    dark: {
        backgroundColor: color(white).alpha(0.12).rgb().string(),
        height: StyleSheet.hairlineWidth,
    },
    inset: {
        marginLeft: 72,
    },
});

export default Divider;
