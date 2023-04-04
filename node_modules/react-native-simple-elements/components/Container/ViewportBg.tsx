import * as React from "react";
import { Animated } from "react-native";
import { compose, color, ColorProps } from "styled-system";
import { ThemeContext } from "styled-components";
import styled from "styled-components/native";

const StyledViewportBg = styled(Animated.View)<ColorProps>({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
}, compose(color));

const ViewportBg = (props) => {

    const { colors } = React.useContext(ThemeContext);

    return (
        <StyledViewportBg
            backgroundColor={colors.background}
        />
    );
};

export default ViewportBg;
