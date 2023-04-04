import * as React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components";

const StyledViewport = styled.View({
    position: ["web"].includes(Platform.OS) ? "fixed" : "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

const Viewport = (props) => {

    const { children, style, ...rest } = props;
    const { colors } = React.useContext(ThemeContext);

    return (
        <StyledViewport
            style={[
                { backgroundColor: colors.background },
                style,
            ]}
            testID="viewport"
            {...rest}
        >
            {children}
        </StyledViewport>
    );
};

export default Viewport;
