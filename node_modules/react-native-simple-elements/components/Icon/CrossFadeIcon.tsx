import * as React from "react";
import { Animated } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import styled from "styled-components/native";
import Icon, { isValidIcon, isEqualIcon } from "./SvgIcon";

const CrossFadeIconWrapperView = styled.View({
    alignItems: "center",
    justifyContent: "center",
});

type Props = {
    /**
     * Icon to display for the `CrossFadeIcon`.
     */
    icon: React.ReactElement;
    /**
     * Color of the icon.
     */
    color: string;
    /**
     * Size of the icon.
     */
    size: number;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

const CrossFadeIcon = ({ color, size, icon }: Props) => {
    const theme = React.useContext(ThemeContext);
    const [currentIcon, setCurrentIcon] = React.useState<React.ReactElement>(
        () => icon
    );
    const [previousIcon, setPreviousIcon] = React.useState<React.ReactElement | null>(
        null
    );
    const { current: fade } = React.useRef<Animated.Value>(new Animated.Value(1));

    const { scale } = theme.animation;

    if (currentIcon !== icon) {
        setPreviousIcon(() => currentIcon);
        setCurrentIcon(() => icon);
    }

    React.useEffect(() => {
        if (isValidIcon(previousIcon) && !isEqualIcon(previousIcon, currentIcon)) {
            fade.setValue(1);

            Animated.timing(fade, {
                duration: scale * 200,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [currentIcon, previousIcon, fade, scale]);

    const opacityPrev = fade;
    const opacityNext = previousIcon
        ? fade.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        })
        : 1;

    const rotatePrev = fade.interpolate({
        inputRange: [0, 1],
        outputRange: ["-90deg", "0deg"],
    });

    const rotateNext = previousIcon
        ? fade.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "-180deg"],
        })
        : "0deg";

    return (
        <CrossFadeIconWrapperView
            style={{
                width: size,
                height: size,
            }}
            testID="icon_fade_view"
        >
            {previousIcon ? (
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        },
                        {
                            opacity: opacityPrev,
                            transform: [{ rotate: rotatePrev }],
                        },
                    ]}
                    testID="icon_fade_animated_view"
                >
                    <Icon icon={previousIcon} size={size} color={color} />
                </Animated.View>
            ) : null}
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    },
                    {
                        opacity: opacityNext,
                        transform: [{ rotate: rotateNext }],
                    },
                ]}
                testID="icon_fade_animated_view"
            >
                <Icon icon={currentIcon} size={size} color={color} />
            </Animated.View>
        </CrossFadeIconWrapperView>
    );
};

export default CrossFadeIcon;
