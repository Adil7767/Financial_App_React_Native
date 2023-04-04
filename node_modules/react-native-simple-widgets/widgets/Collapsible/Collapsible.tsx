
import * as React from "react";
import { Animated, Easing } from "react-native";
import Accordion from "./Accordion";

const ANIMATED_EASING_PREFIXES = ["easeInOut", "easeOut", "easeIn"];

type Props = {
    collapsed?: boolean,
    collapsedHeight?: number,
    duration?: number,
    height?: number,
    onAnimationEnd?: (evt?) => void,
    enablePointerEvents?: boolean,
    renderChildrenCollapsed?: boolean,
    align?: string, // "bottom" | "top"
    style?: any,
    easing?: string, // "easeOutCubic"
};

type State = {
    measuring?: boolean,
    measured?: boolean,
    height?: Animated.Value,
    contentHeight?: number,
    animating?: boolean,
}

class Collapsible extends React.Component<Props, State> {

    static defaultProps = {
        align: "top",
        collapsed: true,
        collapsedHeight: 0,
        enablePointerEvents: false,
        duration: 300,
        easing: "easeOutCubic",
        onAnimationEnd: () => null,
        renderChildrenCollapsed: true,
    };

    static Accordion = Accordion;

    unmounted: boolean;
    // easing
    _animation: Animated.CompositeAnimation;

    constructor(props) {
        super(props);
        this.state = {
            measuring: false,
            measured: false,
            height: new Animated.Value(props.collapsedHeight),
            contentHeight: 0,
            animating: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.collapsed !== this.props.collapsed) {
            this.setState({ measured: false }, () =>
                this._componentDidUpdate(prevProps)
            );
        } else {
            this._componentDidUpdate(prevProps);
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _componentDidUpdate(prevProps) {
        if (prevProps.collapsed !== this.props.collapsed) {
            this._toggleCollapsed(this.props.collapsed);
        } else if (
            this.props.collapsed &&
            prevProps.collapsedHeight !== this.props.collapsedHeight
        ) {
            this.state.height.setValue(this.props.collapsedHeight);
        }
    }

    contentHandle = null;

    _handleRef = (ref) => {
        this.contentHandle = ref;
    };

    _measureContent(callback) {
        this.setState(
            {
                measuring: true,
            },
            () => {
                requestAnimationFrame(() => {
                    if (!this.contentHandle) {
                        this.setState(
                            {
                                measuring: false,
                            },
                            () => callback(this.props.collapsedHeight)
                        );
                    } else {
                        let ref;
                        if (typeof this.contentHandle.measure === "function") {
                            ref = this.contentHandle;
                        } else {
                            ref = this.contentHandle.getNode();
                        }
                        ref.measure((x, y, width, height) => {
                            this.setState(
                                {
                                    measuring: false,
                                    measured: true,
                                    contentHeight: height,
                                },
                                () => callback(height)
                            );
                        });
                    }
                });
            }
        );
    }

    _toggleCollapsed(collapsed) {
        if (collapsed) {
            this._transitionToHeight(this.props.collapsedHeight);
        } else if (!this.contentHandle) {
            if (this.state.measured) {
                this._transitionToHeight(this.state.contentHeight);
            }
            return;
        } else {
            this._measureContent((contentHeight) => {
                this._transitionToHeight(contentHeight);
            });
        }
    }

    _transitionToHeight(height) {
        const { duration } = this.props;
        const easing = this.props.easing;
        let formattedEasing: any;
        if (typeof easing === "string") {
            let prefix;
            let found = false;
            for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
                prefix = ANIMATED_EASING_PREFIXES[i];
                if (easing.substr(0, prefix.length) === prefix) {
                    const temp =
                        easing.substr(prefix.length, 1).toLowerCase() +
                        easing.substr(prefix.length + 1);
                    prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
                    formattedEasing = Easing[prefix](Easing[temp || "ease"]);
                    found = true;
                    break;
                }
            }
            if (!found) {
                formattedEasing = Easing[easing];
            }
            if (!easing) {
                throw new Error("Invalid easing type \"" + this.props.easing + "\"");
            }
        }

        // if (this._animation) {
        //     this._animation.stop();
        // }
        this.setState({ animating: true });
        // TODO: Animated.timing don't return anything, please check
        // this._animation = Animated.timing(this.state.height, {
        Animated.timing(this.state.height, {
            useNativeDriver: false,
            toValue: height ? height : 0,
            duration,
            easing: formattedEasing,
        }).start(() => {
            if (this.unmounted) {
                return;
            }
            this.setState({ animating: false }, () => {
                if (this.unmounted) {
                    return;
                }
                this.props.onAnimationEnd();
            });
        });
    }

    _handleLayoutChange = (event) => {
        const contentHeight = event.nativeEvent.layout.height;
        if (
            this.state.animating ||
            this.props.collapsed ||
            this.state.measuring ||
            this.state.contentHeight === contentHeight
        ) {
            return;
        }

        this.state.height.setValue(contentHeight);
        this.setState({ contentHeight });
    };

    render() {
        const {
            collapsed,
            enablePointerEvents,
            renderChildrenCollapsed,
        } = this.props;
        const {
            height,
            contentHeight,
            measuring,
            measured,
            animating,
        } = this.state;
        const hasKnownHeight = !measuring && (measured || collapsed);
        const style: any = hasKnownHeight && {
            overflow: "hidden",
            height: height,
        };
        const contentStyle = {} as any;
        if (measuring) {
            contentStyle.position = "absolute";
            contentStyle.opacity = 0;
        } else if (this.props.align === "center") {
            contentStyle.transform = [
                {
                    translateY: height.interpolate({
                        inputRange: [0, contentHeight],
                        outputRange: [contentHeight / -2, 0],
                    }),
                },
            ];
        } else if (this.props.align === "bottom") {
            contentStyle.transform = [
                {
                    translateY: height.interpolate({
                        inputRange: [0, contentHeight],
                        outputRange: [-contentHeight, 0],
                    }),
                },
            ];
        }
        if (animating) {
            contentStyle.height = contentHeight;
        }
        const shouldRenderChildren =
            renderChildrenCollapsed ||
            ((!collapsed || (collapsed && animating)) &&
                (animating || measuring || measured));

        return (
            <Animated.View
                style={style}
                pointerEvents={!enablePointerEvents && collapsed ? "none" : "auto"}
            >
                <Animated.View
                    ref={this._handleRef}
                    style={[this.props.style, contentStyle]}
                    onLayout={this.state.animating ? undefined : this._handleLayoutChange}
                >
                    {shouldRenderChildren && this.props.children}
                </Animated.View>
            </Animated.View>
        );
    }
}

export default Collapsible;
