import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "./Shimmer";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient as any);

type Props = {
    size?: number,
}

const defaultProps = {
    size: 24,
};

const SquareShimmer = ({
    size,
}: Props) => {

    return (
        <ShimmerPlaceHolder
            width={size}
            height={size}
        />
    );
};

SquareShimmer.defaultProps = defaultProps;

export default SquareShimmer;
