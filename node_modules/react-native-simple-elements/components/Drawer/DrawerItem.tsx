import color from "color";
import * as React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Text from "../Text";
import { SvgIcon } from "../Icon";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { DefaultTheme, ThemeContext } from "styled-components";
import styled from "styled-components/native";

const DrawerItemContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 4px;
    margin-left: 4px;
`;

const DrawerItemWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px;
`;

const DrawerItemLabel = styled(Text)`
    margin-right: 32px;
`;

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * The label text of the item.
     */
    label: string;
    /**
     * Icon to display for the `DrawerItem`.
     */
    icon?: React.ReactElement;
    /**
     * Whether to highlight the drawer item as active.
     */
    active?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/drawer-item.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DrawerItem } from 'react-native-simple-elements/components/Drawer';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
const DrawerItem = ({
    icon,
    label,
    active,
    style,
    onPress,
    accessibilityLabel,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const { colors, roundness } = theme;
    const backgroundColor = active
        ? color(colors.primary).alpha(0.12).rgb().string()
        : "transparent";
    const contentColor = active
        ? colors.primary
        : color(colors.text).alpha(0.68).rgb().string();
    const font = theme.fonts.medium;
    const labelMargin = icon ? 32 : 0;

    return (
        <DrawerItemContainer
            {...rest}
            style={[
                { backgroundColor, borderRadius: roundness },
                style,
            ]}
        >
            <TouchableRipple
                borderless
                // delayPressIn={0}
                onPress={onPress}
                style={{ borderRadius: roundness }}
                // accessibilityTraits={active ? ['button', 'selected'] : 'button'}
                // accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={accessibilityLabel}
            >
                <DrawerItemWrapper>
                    {icon ? <SvgIcon icon={icon} size={24} color={contentColor} /> : null}
                    <DrawerItemLabel
                        selectable={false}
                        numberOfLines={1}
                        style={[
                            {
                                color: contentColor,
                                ...font,
                                marginLeft: labelMargin,
                            },
                        ]}
                    >
                        {label}
                    </DrawerItemLabel>
                </DrawerItemWrapper>
            </TouchableRipple>
        </DrawerItemContainer>
    );
};

DrawerItem.displayName = "Drawer.Item";

export default DrawerItem;
