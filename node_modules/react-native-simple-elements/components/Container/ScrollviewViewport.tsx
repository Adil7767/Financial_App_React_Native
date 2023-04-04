import * as React from "react";
import styled from "styled-components/native";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

const DefaultScrollview = styled.ScrollView<LayoutProps & SpaceProps>(
    layout,
    space,
);

DefaultScrollview.defaultProps = {
    overflowY: "scroll",
};

function ScrollviewViewport(props) {
    const {
        children,
        paddingTop,
        paddingBottom,
    } = props;

    return (
        <DefaultScrollview
            height={"100%"}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
            }}
        >
            {children}
        </DefaultScrollview>
    );
}

ScrollviewViewport.defaultProps = {
    paddingTop: 0,
    paddingBottom: 0,
};

export default ScrollviewViewport;
