
import color from "color";
import * as React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import Text from "../Text";
import Divider from "../Divider";
import { DefaultTheme, ThemeContext } from "styled-components";
import styled from "styled-components/native";

const DrawerSectionContainer = styled.View`
    margin-bottom: 4px;
`;

const DrawerSectionTitleContainer = styled.View`
    height: 40px;
    justify-content: center;
`;

const DrawerSectionDivider = styled(Divider)`
    margin-top: 4px;
`;

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Title to show as the header for the section.
     */
    title?: string;
    /**
     * Content of the `Drawer.Section`.
     */
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * A component to group content inside a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/drawer-section.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DrawerItem } from 'react-native-simple-elements/components/Drawer';
 *
 * const MyComponent = () => {
 *   const [active, setActive] = React.useState('');
 *
 *
 *   return (
 *     <Drawer.Section title="Some title">
 *       <Drawer.Item
 *         label="First Item"
 *         active={active === 'first'}
 *         onPress={() => setActive('first')}
 *       />
 *       <Drawer.Item
 *         label="Second Item"
 *         active={active === 'second'}
 *         onPress={() => setActive('second')}
 *       />
 *     </Drawer.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DrawerSection = ({ children, title, style, ...rest }: Props) => {
    const theme = React.useContext(ThemeContext);
    const { colors, fonts } = theme;
    const titleColor = color(colors.text).alpha(0.54).rgb().string();
    const font = fonts.medium;

    return (
        <DrawerSectionContainer style={style} {...rest}>
            {title && (
                <DrawerSectionTitleContainer>
                    <Text
                        numberOfLines={1}
                        style={{ color: titleColor, ...font, marginLeft: 16 }}
                    >
                        {title}
                    </Text>
                </DrawerSectionTitleContainer>
            )}
            {children}
            <DrawerSectionDivider />
        </DrawerSectionContainer>
    );
};

DrawerSection.displayName = "Drawer.Section";

export default DrawerSection;
