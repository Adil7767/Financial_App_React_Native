import styled from "styled-components/native";
import { space, SpaceProps } from "styled-system";

const ToastWrapperContainer = styled.View<SpaceProps>`
    ${space};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
`;

export const ToastWrapper = ({
    children,
}) => {
    return (
        <ToastWrapperContainer>
            {children}
        </ToastWrapperContainer>
    );
};
