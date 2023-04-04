import * as React from "react";
import {
    Animated,
    Easing,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from "react-native";

const DEFAULT_DOT_SIZE = 7;
const DEFAULT_DOT_COLOR = "rgba(0, 0, 0, 0.75)";

type Props = {
    inactiveOpacity: number,
    inactiveScale: number,
    active?: boolean,
    activeOpacity?: number,
    carouselRef?: Record<string, Record<string, unknown>>,
    color?: string,
    containerStyle?: StyleProp<ViewStyle>,
    inactiveColor?: string,
    inactiveStyle?: StyleProp<ViewStyle>,
    index?: number,
    style?: StyleProp<ViewStyle>,
    tappable?: boolean,
    animatedDuration?: number,
    animatedFriction?: number,
    animatedTension?: number,
    delayPressInDot?: number,
};

type State = {
    animColor: Animated.Value,
    animOpacity: Animated.Value,
    animTransform: Animated.Value,
}

export default class PaginationDot extends React.PureComponent<Props, State> {

    state: State = {
        animColor: new Animated.Value(0),
        animOpacity: new Animated.Value(0),
        animTransform: new Animated.Value(0),
    };

    componentDidMount() {
        if (this.props.active) {
            this._animate(1);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active !== this.props.active) {
            this._animate(this.props.active ? 1 : 0);
        }
    }

    _animate(toValue = 0) {
        const { animColor, animOpacity, animTransform } = this.state;
        const { animatedDuration, animatedFriction, animatedTension } = this.props;

        const commonProperties = {
            toValue,
            duration: animatedDuration,
            isInteraction: false,
            useNativeDriver: !this._shouldAnimateColor,
        };

        const animations = [
            Animated.timing(animOpacity, {
                easing: Easing.linear,
                ...commonProperties,
            }),
            Animated.spring(animTransform, {
                friction: animatedFriction,
                tension: animatedTension,
                ...commonProperties,
            }),
        ];

        if (this._shouldAnimateColor) {
            animations.push(
                Animated.timing(animColor, {
                    easing: Easing.linear,
                    ...commonProperties,
                })
            );
        }

        Animated.parallel(animations).start();
    }

    get _shouldAnimateColor() {
        const { color, inactiveColor } = this.props;
        return color && inactiveColor;
    }

    render() {
        const { animColor, animOpacity, animTransform } = this.state;
        const {
            active,
            activeOpacity,
            carouselRef,
            color,
            containerStyle,
            inactiveColor,
            inactiveStyle,
            inactiveOpacity,
            inactiveScale,
            index,
            style,
            tappable,
            delayPressInDot,
        } = this.props;

        const animatedStyle = {
            opacity: animOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [inactiveOpacity, 1],
            }),
            transform: [
                {
                    scale: animTransform.interpolate({
                        inputRange: [0, 1],
                        outputRange: [inactiveScale, 1],
                    }),
                },
            ],
        };
        const animatedColor = this._shouldAnimateColor
            ? {
                backgroundColor: animColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: [inactiveColor, color],
                }),
            }
            : {};

        const dotContainerStyle = [
            {
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 8,
            },
            containerStyle || {},
        ] as any;

        const dotStyle = [
            {
                width: DEFAULT_DOT_SIZE,
                height: DEFAULT_DOT_SIZE,
                borderRadius: DEFAULT_DOT_SIZE / 2,
                backgroundColor: DEFAULT_DOT_COLOR,
            },
            style || {},
            (!active && inactiveStyle) || {},
            animatedStyle,
            animatedColor,
        ];

        const onPress = tappable
            ? () => {
                try {
                    const currentRef = carouselRef.current || carouselRef;
                    // @ts-ignore
                    currentRef._snapToItem(currentRef._getPositionIndex(index));
                } catch (error) {
                    console.warn(
                        "react-native-snap-carousel | Pagination: " +
                        "`carouselRef` has to be a Carousel ref.\n" +
                        error
                    );
                }
            }
            : undefined;

        return (
            <TouchableOpacity
                accessible={false}
                style={dotContainerStyle}
                activeOpacity={tappable ? activeOpacity : 1}
                onPress={onPress}
                delayPressIn={delayPressInDot}
            >
                <Animated.View style={dotStyle} />
            </TouchableOpacity>
        );
    }
}
