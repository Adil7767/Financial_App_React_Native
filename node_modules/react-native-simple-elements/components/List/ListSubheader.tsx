import * as React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import color from "color";
import Text from "../Text";
import { DefaultTheme, ThemeContext } from "styled-components";

type Props = React.ComponentProps<typeof Text> & {
    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * Style that is passed to Text element.
     */
    style?: StyleProp<TextStyle>;
};

/**
 * A component used to display a header in lists.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ListItem } from 'react-native-simple-elements/components/List';
 *
 * const MyComponent = () => <List.Subheader>My List Title</List.Subheader>;
 *
 * export default MyComponent;
 * ```
 */
const ListSubheader = ({ style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);
    const { colors, fonts } = theme;
    const font = fonts.medium;
    const textColor = color(colors.text).alpha(0.54).rgb().string();

    return (
        <Text
            numberOfLines={1}
            {...rest}
            style={[styles.container, { color: textColor, ...font }, style]}
        />
    );
};

ListSubheader.displayName = "List.Subheader";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
});

export default ListSubheader;
