import * as React from "react";
import { I18nManager, Platform, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import PaginationDot from "./PaginationDot";

const IS_IOS = Platform.OS === "ios";
const IS_RTL = I18nManager.isRTL;

const PaginationView = styled.View<ViewStyle>({
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: "absolute",
});

type Props = {
    activeDotIndex: number,
    dotsLength: number,
    activeOpacity?: number,
    carouselRef?: Record<string, unknown>,
    containerStyle?: StyleProp<ViewStyle>,
    dotColor?: string,
    dotContainerStyle?: StyleProp<ViewStyle>,
    dotElement?: React.ReactElement,
    dotStyle?: StyleProp<ViewStyle>,
    inactiveDotColor?: string,
    inactiveDotElement?: React.ReactElement,
    inactiveDotOpacity?: number,
    inactiveDotScale?: number,
    inactiveDotStyle?: StyleProp<ViewStyle>,
    renderDots?: (index, dotsLength, obj) => React.ReactNode,
    tappableDots?: boolean,
    vertical?: boolean,
    accessibilityLabel?: string,
    animatedDuration?: number,
    animatedFriction?: number,
    animatedTension?: number,
    delayPressInDot?: number,
    paginationStyle?: StyleProp<ViewStyle>,
};

export default class Pagination extends React.PureComponent<Props> {

    static defaultProps = {
        inactiveDotOpacity: 0.5,
        inactiveDotScale: 0.5,
        tappableDots: false,
        vertical: false,
        animatedDuration: 250,
        animatedFriction: 4,
        animatedTension: 50,
        delayPressInDot: 0,
    };

    constructor(props) {
        super(props);

        // Warnings
        if (
            (props.dotColor && !props.inactiveDotColor) ||
            (!props.dotColor && props.inactiveDotColor)
        ) {
            console.warn(
                "react-native-snap-carousel | Pagination: " +
                "You need to specify both `dotColor` and `inactiveDotColor`"
            );
        }
        if (
            (props.dotElement && !props.inactiveDotElement) ||
            (!props.dotElement && props.inactiveDotElement)
        ) {
            console.warn(
                "react-native-snap-carousel | Pagination: " +
                "You need to specify both `dotElement` and `inactiveDotElement`"
            );
        }
        if (props.tappableDots && props.carouselRef === undefined) {
            console.warn(
                "react-native-snap-carousel | Pagination: " +
                "You must specify prop `carouselRef` when setting `tappableDots` to `true`"
            );
        }
    }

    _needsRTLAdaptations() {
        const { vertical } = this.props;
        return IS_RTL && !IS_IOS && !vertical;
    }

    get _activeDotIndex() {
        const { activeDotIndex, dotsLength } = this.props;
        return this._needsRTLAdaptations()
            ? dotsLength - activeDotIndex - 1
            : activeDotIndex;
    }

    get dots() {
        const {
            activeOpacity,
            carouselRef,
            dotsLength,
            dotColor,
            dotContainerStyle,
            dotElement,
            dotStyle,
            inactiveDotColor,
            inactiveDotElement,
            inactiveDotOpacity,
            inactiveDotScale,
            inactiveDotStyle,
            renderDots,
            tappableDots,
            animatedDuration,
            animatedFriction,
            animatedTension,
            delayPressInDot,
        } = this.props;

        if (renderDots) {
            return renderDots(this._activeDotIndex, dotsLength, this);
        }

        const DefaultDot = (
            <PaginationDot
                // @ts-ignore
                carouselRef={carouselRef}
                tappable={Boolean(tappableDots && typeof carouselRef !== "undefined")}
                activeOpacity={activeOpacity}
                color={dotColor}
                containerStyle={dotContainerStyle}
                style={dotStyle}
                inactiveColor={inactiveDotColor}
                inactiveOpacity={inactiveDotOpacity}
                inactiveScale={inactiveDotScale}
                inactiveStyle={inactiveDotStyle}
                animatedDuration={animatedDuration}
                animatedFriction={animatedFriction}
                animatedTension={animatedTension}
                delayPressInDot={delayPressInDot}
            />
        );

        // @ts-ignore
        const dots = [...Array(dotsLength).keys()].map(i => {
            const isActive = i === this._activeDotIndex;
            return React.cloneElement(
                (isActive ? dotElement : inactiveDotElement) || DefaultDot,
                {
                    key: `pagination-dot-${i}`,
                    active: isActive,
                    index: i,
                }
            );
        });

        return dots;
    }

    render() {
        const {
            dotsLength,
            vertical,
            accessibilityLabel,
            paginationStyle,
        } = this.props;

        if (!dotsLength || dotsLength < 2) {
            return false;
        }

        return (
            <PaginationView
                pointerEvents={"box-none"}
                style={[
                    {
                        flexDirection: vertical
                            ? "column"
                            : this._needsRTLAdaptations()
                                ? "row-reverse"
                                : "row"
                    },
                    paginationStyle,
                ]}
                accessible={!!accessibilityLabel}
                accessibilityLabel={accessibilityLabel}
            >
                {this.dots}
            </PaginationView>
        );
    }
}
