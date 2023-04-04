import * as React from "react";
import styled from "styled-components/native";
import useScrollbarSize from "react-scrollbar-size";
import {
    AppbarBackAction,
    AppbarContent,
    AppbarHeader,
} from "react-native-simple-elements/components/Appbar";
import useScreenSize from "react-native-simple-elements/components/Container/utils/useScreenSize";
import HomeIcon from "@mdi/svg/svg/home.svg";
import { View } from "react-native";
import Container, { ContainerFluid, FlexItem } from "react-native-simple-elements/components/Container";

const HeaderContainer = styled.View({
    zIndex: 3,
});

const DesktopLeftContentWrapper = styled.View({
    width: 240,
    flexDirection: "row",
    alignItems: "center",
});

type Props = {
    title?: string,
    subtitle?: string,
    showBackIcon?: boolean,
    backButtonIcon?: React.ReactElement,
    mobileLeft?: (props?) => React.ReactNode,
    mobileContent?: (props?) => React.ReactNode,
    mobileRight?: (props?) => React.ReactNode,
    desktopLeft?: (props?) => React.ReactNode;
    desktopContent?: (props?) => React.ReactNode;
    desktopRight?: (props?) => React.ReactNode,
    onHomeActionPress?: () => void,
    onBackActionPress?: () => void,
    shouldCheckScrollbarSize?: boolean,
    fluid?: boolean,
};

const defaultProps = {
    isUserIconCircle: true,
    shouldCheckScrollbarSize: false,
    fluid: false,
};

const SimpleHeader = ({
    title,
    subtitle,
    mobileLeft,
    mobileContent,
    mobileRight,
    desktopLeft,
    desktopContent,
    desktopRight,
    showBackIcon,
    backButtonIcon,
    onHomeActionPress,
    onBackActionPress,
    shouldCheckScrollbarSize,
    fluid,
}: Props) => {

    const ContainerComponent = fluid ? ContainerFluid : Container;

    const { isMobileView } = useScreenSize();
    const { width: scrollbarSize } = useScrollbarSize();

    const _handleBackActionPress = () => {
        if (showBackIcon) {
            if (typeof onBackActionPress === "function") {
                onBackActionPress();
            }
        } else {
            if (typeof onHomeActionPress === "function") {
                onHomeActionPress();
            }
        }
    };

    return (
        <HeaderContainer
            style={{
                marginRight: shouldCheckScrollbarSize ? scrollbarSize || 0 : 0,
            }}
        >
            <AppbarHeader
                style={{
                    justifyContent: "center",
                }}
            >
                <ContainerComponent>
                    {isMobileView ?
                        <FlexItem
                            left={() => mobileLeft ? mobileLeft() :
                                <AppbarBackAction
                                    icon={showBackIcon ? backButtonIcon : HomeIcon}
                                    onPress={_handleBackActionPress}
                                />
                            }
                            content={() => mobileContent ? mobileContent() :
                                <AppbarContent
                                    title={title}
                                    subtitle={subtitle}
                                    style={{
                                        justifyContent: "center",
                                    }}
                                />
                            }
                            right={() => mobileRight ? mobileRight() : null}
                        />
                        : null
                    }
                    {!isMobileView ?
                        <FlexItem
                            left={() => desktopLeft ?
                                <>
                                    <DesktopLeftContentWrapper>
                                        {desktopLeft ? desktopLeft() : null}
                                    </DesktopLeftContentWrapper>
                                </>
                                :
                                null
                            }
                            content={() =>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    {desktopContent ? desktopContent() : null}
                                </View>
                            }
                            right={() => desktopRight ? desktopRight() : null}
                        />
                        : null
                    }
                </ContainerComponent>
            </AppbarHeader>
        </HeaderContainer>
    );
};

SimpleHeader.defaultProps = defaultProps;

export default SimpleHeader;
