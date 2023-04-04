import * as React from "react";
import {
    View,
    ViewStyle,
    StyleProp,
    GestureResponderEvent,
} from "react-native";
import color from "color";

import TouchableRipple from "../TouchableRipple/TouchableRipple";

import type { $RemoveChildren } from "../types";
import { DefaultTheme } from "styled-components";
import Image from "../Image/Image";

type Props = $RemoveChildren<typeof TouchableRipple> & {
    ImageComponent?: React.ComponentType<any>;
    /**
     * Icon to display.
     */
    source: Record<string, any>;
    /**
     * Size of the icon.
     */
    size?: number;
    /**
     * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Whether an icon change is animated.
     */
    animated?: boolean;

    circle?: boolean;

    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;

    style?: StyleProp<ViewStyle>;

    // ref?: React.RefObject<TouchableWithoutFeedback>;
    ref?: React.RefObject<View>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * An icon button is a button which displays only an icon without a label.
 * By default button has 150% size of the icon.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/icon-button-1.png" />
 *     <figcaption>Icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/icon-button-2.png" />
 *     <figcaption>Pressed icon button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import ImageButton from "react-native-simple-elements/components/ImageButton";
 * import * as Colors } from 'react-native-simple-elements/components/theme/colors';
 * import CameraIcon from "@mdi/svg/svg/camera.svg";
 *
 * const MyComponent = () => (
 *   <ImageButton
 *     source={CameraIcon}
 *     color={Colors.red500}
 *     size={20}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 */
const ImageButton = ({
    ImageComponent,
    source,
    size = 24,
    accessibilityLabel,
    disabled,
    onPress,
    animated = false,
    circle = false,
    style,
    ...rest
}: Props) => {
    const rippleColor = color("#000000").alpha(0.32).rgb().string();
    const buttonSize = size * 1.5;
    const containerBorderRadius = circle ? buttonSize / 2 : 0;
    const iconBorderRadius = circle ? size / 2 : 0;

    return (
        <TouchableRipple
            borderless
            centered
            onPress={onPress}
            rippleColor={rippleColor}
            style={[
                {
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    margin: 6,
                    borderRadius: buttonSize / 2,
                },
                { width: buttonSize, height: buttonSize, borderRadius: containerBorderRadius },
                disabled && { opacity: 0.32 },
                style,
            ]}
            accessibilityLabel={accessibilityLabel}
            // accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
            // accessibilityComponentType="button"
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            hitSlop={
                // @ts-ignore - this should be fixed in react-theme-providersince withTheme() is not forwarding static property types
                TouchableRipple.supported
                    ? { top: 10, left: 10, bottom: 10, right: 10 }
                    : { top: 6, left: 6, bottom: 6, right: 6 }
            }
            {...rest}
        >
            <View testID="icon_view" style={{ borderRadius: iconBorderRadius }}>
                <Image
                    ImageComponent={ImageComponent}
                    source={source}
                    resizeMode="cover"
                    style={{ width: size, height: size, borderRadius: iconBorderRadius }}
                />
            </View>
        </TouchableRipple>
    );
};

export default ImageButton;
