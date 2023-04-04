
import * as React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import Title from "../Text/Title";

type Props = React.ComponentPropsWithRef<typeof Title> & {
    /**
     * Title text for the `DialogTitle`.
     */
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * A component to show a title in a Dialog.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/dialog-title.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Paragraph } from 'react-native-simple-elements/components/Text';
 * import Dialog from 'react-native-simple-elements/components/Dialog';
 * import Portal from 'react-native-simple-elements/components/Portal';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Title>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Paragraph>This is simple dialog</Paragraph>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogTitle = ({ children, style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <Title
            // accessibilityTraits="header"
            accessibilityRole="header"
            style={[styles.text, { color: theme.colors.text }, style]}
            {...rest}
        >
            {children}
        </Title>
    );
};

DialogTitle.displayName = "Dialog.Title";

const styles = StyleSheet.create({
    text: {
        marginTop: 22,
        marginBottom: 18,
        marginHorizontal: 24,
    },
});

export default DialogTitle;

// @component-docs ignore-next-line
export { DialogTitle };
