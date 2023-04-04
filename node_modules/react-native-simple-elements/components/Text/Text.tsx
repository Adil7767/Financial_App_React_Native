import * as React from "react";
import {
    Text as NativeText,
    TextStyle,
    StyleProp,
    StyleSheet,
} from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";

type Props = React.ComponentProps<typeof NativeText> & {
    children?: React.ReactNode,

    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

// @component-group Typography

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const Text: React.RefForwardingComponent<{}, Props> = (
    { style, ...rest }: Props,
    ref
) => {
    const root = React.useRef<NativeText | null>(null);
    const theme = React.useContext(ThemeContext);

    React.useImperativeHandle(ref, () => ({
        setNativeProps: (args: Record<string, any>) => root.current?.setNativeProps(args),
    }));

    return (
        <NativeText
            {...rest}
            ref={root}
            style={[
                {
                    ...theme.fonts.regular,
                    color: theme.colors.text,
                },
                styles.text,
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

export default React.forwardRef(Text);
