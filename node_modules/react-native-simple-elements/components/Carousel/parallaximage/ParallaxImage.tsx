// Parallax effect inspired by https://github.com/oblador/react-native-parallax/

import * as React from "react";
import {
    Animated,
    Easing,
    ActivityIndicator,
    findNodeHandle,
    StyleProp,
    ViewStyle,
} from "react-native";
import styled from "styled-components/native";

const ParallaxContainer = styled.View`
    overflow: hidden;
    align-items: center;
    justify-content: center;
`;

const ParallaxLoaderContainer = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
`;

type Props = {
    // ...StyleProp<ImageStyle>,
    carouselRef: Record<string, unknown>, // passed from <Carousel />
    itemHeight: number, // passed from <Carousel />
    itemWidth: number, // passed from <Carousel />
    scrollPosition: Record<string, unknown>, // passed from <Carousel />
    sliderHeight: number, // passed from <Carousel />
    sliderWidth: number, // passed from <Carousel />
    vertical: boolean, // passed from <Carousel />
    containerStyle: StyleProp<ViewStyle>,
    dimensions: {
        width: number,
        height: number,
    },
    fadeDuration: number,
    parallaxFactor: number,
    showSpinner: boolean,
    spinnerColor: string,
    AnimatedImageComponent: (() => React.ReactNode) | Record<string, unknown>,

    onLoad?: (evt?) => void,
    onError?: (evt?) => void,
};

type State = {
    offset: number,
    width: number,
    height: number,
    status: number, // 1 -> loading; 2 -> loaded // 3 -> transition finished; 4 -> error
    animOpacity: Animated.Value,
}

export default class ParallaxImage extends React.Component<Props, State> {

    static defaultProps = {
        containerStyle: {},
        fadeDuration: 500,
        parallaxFactor: 0.3,
        showSpinner: true,
        spinnerColor: "rgba(0, 0, 0, 0.4)",
        AnimatedImageComponent: Animated.Image,
    };

    state: State = {
        offset: 0,
        width: 0,
        height: 0,
        status: 1, // 1 -> loading; 2 -> loaded // 3 -> transition finished; 4 -> error
        animOpacity: new Animated.Value(0),
    };

    _container;
    _mounted: boolean;

    constructor(props) {
        super(props);

        this._onLoad = this._onLoad.bind(this);
        this._onError = this._onError.bind(this);
        this._measureLayout = this._measureLayout.bind(this);
    }

    setNativeProps(nativeProps) {
        this._container.setNativeProps(nativeProps);
    }

    componentDidMount() {
        this._mounted = true;

        setTimeout(() => {
            this._measureLayout();
        }, 0);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    _measureLayout() {
        if (this._container) {
            const {
                dimensions,
                vertical,
                carouselRef,
                sliderWidth,
                sliderHeight,
                itemWidth,
                itemHeight,
            } = this.props;

            if (carouselRef) {
                this._container.measureLayout(
                    // @ts-ignore
                    findNodeHandle(carouselRef),
                    (x, y, width, height, pageX, pageY) => {
                        const offset = vertical
                            ? y - (sliderHeight - itemHeight) / 2
                            : x - (sliderWidth - itemWidth) / 2;

                        this.setState({
                            offset: offset,
                            width:
                                dimensions && dimensions.width
                                    ? dimensions.width
                                    : Math.ceil(width),
                            height:
                                dimensions && dimensions.height
                                    ? dimensions.height
                                    : Math.ceil(height),
                        });
                    }
                );
            }
        }
    }

    _onLoad(event) {
        const { animOpacity } = this.state;
        const { fadeDuration, onLoad } = this.props;

        if (!this._mounted) {
            return;
        }

        this.setState({ status: 2 });

        if (onLoad) {
            onLoad(event);
        }

        Animated.timing(animOpacity, {
            toValue: 1,
            duration: fadeDuration,
            easing: Easing.out(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
        }).start(() => {
            this.setState({ status: 3 });
        });
    }

    // If arg is missing from method signature, it just won't be called
    _onError(event) {
        const { onError } = this.props;

        this.setState({ status: 4 });

        if (onError) {
            onError(event);
        }
    }

    get image() {
        const { status, animOpacity, offset, width, height } = this.state;
        const {
            scrollPosition,
            vertical,
            sliderWidth,
            sliderHeight,
            parallaxFactor,
            AnimatedImageComponent,
            ...other
        } = this.props;

        const parallaxPadding = (vertical ? height : width) * parallaxFactor;
        const requiredStyles = { position: "relative" };
        const dynamicStyles = {
            width: vertical ? width : width + parallaxPadding * 2,
            height: vertical ? height + parallaxPadding * 2 : height,
            opacity: animOpacity,
            transform: scrollPosition
                ? [
                    {
                        translateX: !vertical
                            // @ts-ignore
                            ? scrollPosition.interpolate({
                                inputRange: [offset - sliderWidth, offset + sliderWidth],
                                outputRange: [-parallaxPadding, parallaxPadding],
                                extrapolate: "clamp",
                            })
                            : 0,
                    },
                    {
                        translateY: vertical
                            // @ts-ignore
                            ? scrollPosition.interpolate({
                                inputRange: [offset - sliderHeight, offset + sliderHeight],
                                outputRange: [-parallaxPadding, parallaxPadding],
                                extrapolate: "clamp",
                            })
                            : 0,
                    },
                ]
                : [],
        };

        return (
            // @ts-ignore
            <AnimatedImageComponent
                {...other}
                style={[
                    {
                        position: "relative",
                        resizeMode: "cover",
                        width: null,
                        height: null,
                    },
                    requiredStyles,
                    dynamicStyles,
                ]}
                onLoad={this._onLoad}
                onError={status !== 3 ? this._onError : undefined} // prevent infinite-loop bug
            />
        );
    }

    get spinner() {
        const { status } = this.state;
        const { showSpinner, spinnerColor } = this.props;

        return status === 1 && showSpinner ? (
            <ParallaxLoaderContainer>
                <ActivityIndicator
                    size={"small"}
                    color={spinnerColor}
                    animating={true}
                />
            </ParallaxLoaderContainer>
        ) : (
            false
        );
    }

    render() {

        return (
            <ParallaxContainer
                ref={c => {
                    this._container = c;
                }}
                pointerEvents={"none"}
                onLayout={this._measureLayout}
            >
                {this.image}
                {this.spinner}
            </ParallaxContainer>
        );
    }
}
