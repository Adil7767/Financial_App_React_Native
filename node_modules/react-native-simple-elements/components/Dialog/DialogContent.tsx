import * as React from "react";
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DialogContent`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * A component to show content in a Dialog.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/dialog-content.png" />
 *   </figure>
 * </div>
 *
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
const DialogContent = (props: Props) => (
    <View {...props} style={[styles.container, props.style]}>
        {props.children}
    </View>
);

DialogContent.displayName = "Dialog.Content";

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
});

export default DialogContent;
