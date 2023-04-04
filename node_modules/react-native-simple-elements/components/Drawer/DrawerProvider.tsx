import * as React from "react";
import { Animated, Easing } from "react-native";
// import styled from "styled-components";
import styled from "styled-components/native";
import { LayoutProps, PositionProps, color, ColorProps, compose, layout, position, flex, FlexProps, SpaceProps, space } from "styled-system";
import DrawerContext from "./DrawerContext";
import TouchableRipple from "../TouchableRipple";

// @component ./DrawerItem.tsx
import { default as Item } from "./DrawerItem";

// @component ./DrawerSection.tsx
import { default as Section } from "./DrawerSection";

const DrawerContainer = styled.View<LayoutProps & PositionProps>(compose(layout, position));
DrawerContainer.defaultProps = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 2,
};

type DrawerBackdropTypes = LayoutProps & PositionProps & ColorProps;
const DrawerBackdrop = Animated.createAnimatedComponent(styled.View<DrawerBackdropTypes>(compose(layout, position, color)));
DrawerBackdrop.defaultProps = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
};

type DrawerPanelTypes = LayoutProps & PositionProps & ColorProps & FlexProps & SpaceProps;
const DrawerPanel = Animated.createAnimatedComponent(styled.View<DrawerPanelTypes>(compose(layout, position, color, flex, space)));
DrawerPanel.defaultProps = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    flexWrap: "nowrap",
    overflow: "hidden",
    flex: 1,
    backgroundColor: "white",
};

const Drawer = (props) => {
    const {
        drawerPaddingTop,
        children,
        showMask,
        animated,
    } = props;
    const { drawerIsOpen, setDrawerIsOpen } = React.useContext(DrawerContext);

    const animatedOpacity = React.useRef(new Animated.Value(0)).current;
    const animatedWidth = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animatedOpacity, {
            toValue: drawerIsOpen ? 1 : 0,
            duration: 100,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();

        Animated.timing(animatedWidth, {
            toValue: drawerIsOpen ? 240 : 0,
            duration: 200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();
    }, [drawerIsOpen]);

    return (
        <DrawerContainer
            width={drawerIsOpen ? "100%" : "0"}
            testID="drawer_container"
            pointerEvents="box-none"
        >
            <DrawerBackdrop
                // as={Animated.View}
                testID="drawer_backdrop"
                width={drawerIsOpen ? "100%" : "0"}
                style={{
                    opacity: animatedOpacity,
                    backgroundColor: showMask ? "#00000077" : "transparent",
                }}
                pointerEvents={showMask ? "auto" : "box-none"}
            >
                {showMask ?
                    <TouchableRipple
                        onPress={() => {
                            setDrawerIsOpen(false);
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <></>
                    </TouchableRipple>
                    :
                    null
                }
            </DrawerBackdrop>
            <DrawerPanel
                testID="drawer_content"
                style={{
                    width: animated ? animatedWidth : (drawerIsOpen ? 240 : 0),
                    // height: "100vh",
                    position: "absolute",
                }}
                paddingTop={drawerPaddingTop ?? "0"}
            >
                {children}
            </DrawerPanel>
        </DrawerContainer>
    );
};

Drawer.Section = Section;
Drawer.Item = Item;

export default Drawer;
