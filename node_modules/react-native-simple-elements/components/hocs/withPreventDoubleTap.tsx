import * as React from "react";
import { debounce } from "../utils/debounce";

// HOC right way
// type PropsAreEqual<P> = (
//     prevProps: Readonly<P>,
//     nextProps: Readonly<P>
// ) => boolean;

// const withSampleHoC = <P extends {}>(
//     component: {
//         (props: P): Exclude<React.ReactNode, undefined>;
//         displayName?: string;
//     },
//     propsAreEqual?: PropsAreEqual<P> | false,
//     componentName = component.displayName ?? component.name
// ): {
//     (props: P): JSX.Element;
//     displayName: string;
// } => {

//     function WithSampleHoc(props: P) {
//         //Do something special to justify the HoC.
//         return component(props) as JSX.Element;
//     }

//     WithSampleHoc.displayName = `withSampleHoC(${componentName})`;

//     let wrappedComponent = propsAreEqual === false ? WithSampleHoc : React.memo(WithSampleHoc, propsAreEqual);

//     //copyStaticProperties(component, wrappedComponent);

//     return wrappedComponent as typeof WithSampleHoc
// };

const TOUCHABLE_AREA_DEBOUNCE_TIME = 500;

type I = {
    onPress: (evt?) => void,
    [key: string]: any,
}

type PropsAreEqual<P> = (
    prevProps: Readonly<P>,
    nextProps: Readonly<P>
) => boolean;

const withPreventDoubleTap = <P extends I>(
    component: {
        (props: P): Exclude<React.ReactNode, undefined>;
        displayName?: string;
    },
    propsAreEqual?: PropsAreEqual<P> | false,
    componentName = component.displayName ?? component.name
): {
    (props: P): JSX.Element;
    displayName: string;
} => {

    function PreventDoubleTap(props: P) {
        const { onPress, ...rest } = props;

        const debouncedOnPress = () => {
            onPress && onPress();
        };

        const _onPress = debounce(
            debouncedOnPress,
            TOUCHABLE_AREA_DEBOUNCE_TIME,
            true
        );

        //Do something special to justify the HoC.
        return component({ ...rest, onPress: _onPress } as any) as JSX.Element;
        // return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }

    PreventDoubleTap.displayName = `withPreventDoubleTap(${componentName})`;

    const wrappedComponent = propsAreEqual === false ? PreventDoubleTap : React.memo(PreventDoubleTap, propsAreEqual);

    //copyStaticProperties(component, wrappedComponent);

    return wrappedComponent as typeof PreventDoubleTap;
};

export default withPreventDoubleTap;
