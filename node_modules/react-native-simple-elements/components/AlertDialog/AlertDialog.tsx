import * as React from "react";
import {
    View,
    KeyboardAvoidingView,
    Modal as RNModal,
    TouchableWithoutFeedback,
    Animated,
    PanResponder,
    Platform,
    StyleProp,
    ViewStyle,
    StyleSheet,
    Dimensions
} from "react-native";
import { ThemeContext } from "styled-components";
import Surface from "../Surface";

const WindowHeight = Dimensions.get("window").height;

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

export type Props = {
    animationType?: "none" | "slide" | "fade",
    visible: boolean,
    dismissable?: boolean,
    openDuration?: number,
    closeDuration?: number,
    closeOnDragDown?: boolean,
    dragFromTopOnly?: boolean,
    closeOnPressBack?: boolean,
    keyboardAvoidingViewEnabled?: boolean,
    customStyles?: Record<string, unknown>,
    onDismiss?: (evt?) => void,
    onOpen?: (evt?) => void,
    children?: React.ReactNode,
    backdropColor?: string,
    contentContainerStyle?: StyleProp<ViewStyle>,
    contentStyle?: StyleProp<ViewStyle>,
};

// type State = {
//     animatedHeight: Animated.Value,
//     pan: Animated.ValueXY,
//     modalVisible: boolean,
// }

const defaultProps = {
    animationType: "none",
    openDuration: 100,
    closeDuration: 100,
    closeOnDragDown: false,
    dragFromTopOnly: false,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === "ios",
    customStyles: {},
    onDismiss: null,
    onOpen: null,
    children: <View />,
    backdropColor: "#00000077",
};

const AlertDialog = ({
    visible,
    dismissable,
    animationType,
    closeOnDragDown,
    dragFromTopOnly,
    closeOnPressBack,
    children,
    customStyles,
    keyboardAvoidingViewEnabled,
    openDuration,
    closeDuration,
    onOpen,
    onDismiss,
    backdropColor,
    contentContainerStyle,
    contentStyle,
}: Props) => {

    const [ isVisible, setIsVisible ] = React.useState(false);
    const theme = React.useContext(ThemeContext);
    const opacityValue = React.useRef(new Animated.Value(0)).current;

    const pan = React.useRef(new Animated.ValueXY());

    const panResponder = React.useRef(undefined);

    React.useEffect(() => {
        if (!isVisible && visible) {
            setModalVisible(true);
        } else if (isVisible && !visible) {
            setModalVisible(false);
        }
    }, [ visible ]);

    // state: State = {
    //     modalVisible: false,
    //     animatedHeight: new Animated.Value(0),
    //     pan: new Animated.ValueXY()
    // };

    // panResponder;

    // constructor(props) {
    //     super(props);

    //     this.createPanResponder(props);
    // }

    const setModalVisible = (visible) => {
        // const { height, minClosingHeight, openDuration, closeDuration, onDismiss, onOpen } = this.props;
        // const { animatedHeight, pan } = this.state;
        if (visible) {
            setIsVisible(visible);
            if (typeof onOpen === "function") onOpen();
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: openDuration || 100,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: closeDuration || 100,
                useNativeDriver: true,
            })
                .start(() => {
                    pan.current.setValue({ x: 0, y: 0 });
                    setIsVisible(visible);

                    // this.setState({
                    //     modalVisible: visible,
                    //     animatedHeight: new Animated.Value(0)
                    // });

                    if (typeof onDismiss === "function") onDismiss();
                });
        }
    };

    const createPanResponder = () => {
        // const { closeOnDragDown, height } = props;
        // const { pan } = this.state;
        panResponder.current = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.current.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                // if (height / 4 - gestureState.dy < 0) {
                if (gestureState.dy > 15) {
                    setModalVisible(false);
                } else {
                    Animated.spring(pan.current, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            }
        });
    };

    // const open = (props?) => {
    //     setModalVisible(true, props);
    // }

    const close = () => {
        setModalVisible(false);
    };

    // const { animatedHeight, pan } = this.state;

    if (!visible && !panResponder.current) {
        createPanResponder();
    }

    const panStyle = {
        transform: pan.current.getTranslateTransform()
    };

    return (
        <RNModal
            transparent
            animationType={animationType}
            visible={isVisible}
            dismissable={dismissable}
            // @ts-ignore
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
                if (closeOnPressBack) setModalVisible(false);
            }}
        >
            <KeyboardAvoidingView
                enabled={keyboardAvoidingViewEnabled}
                behavior="padding"
                style={[
                    {
                        flex: 1,
                        backgroundColor: backdropColor,
                    },
                    customStyles.wrapper,
                ]}
            >
                <TouchableWithoutFeedback
                    // accessibilityLabel={overlayAccessibilityLabel}
                    accessibilityRole="button"
                    disabled={!dismissable}
                    onPress={dismissable ? close : undefined}
                >
                    <Animated.View
                        style={[
                            styles.backdrop,
                            {
                                flex: 1,
                            },
                            { backgroundColor: theme.colors.backdrop, opacity: opacityValue },
                        ]}
                    />
                </TouchableWithoutFeedback>
                <Animated.View
                    {...(!dragFromTopOnly && panResponder.current?.panHandlers ? panResponder.current.panHandlers : {} )}
                    style={[
                        panStyle,
                        {
                            backgroundColor: theme.colors.backdrop,
                            width: "100%",
                            height: WindowHeight,
                            overflow: "hidden"
                        },
                        {
                            flexDirection: "column",
                            flex: 1,
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        },
                        styles.contentContainer,
                        contentContainerStyle,
                        customStyles.container
                    ]}
                    pointerEvents="box-none"
                >
                    {closeOnDragDown && (
                        <View
                            {...(dragFromTopOnly && panResponder.current?.panHandlers ? panResponder.current.panHandlers : {} )}
                            style={{
                                width: "100%",
                                alignItems: "center",
                                backgroundColor: "transparent"
                            }}
                        >
                            <View style={[
                                {
                                    width: 35,
                                    height: 5,
                                    borderRadius: 5,
                                    margin: 10,
                                    backgroundColor: "#ccc",
                                },
                                customStyles.draggableIcon,
                            ]} />
                        </View>
                    )}
                    <View
                        style={{
                            flex: 1,
                        }}
                        pointerEvents="none"
                    >
                    </View>
                    <Surface
                        style={[
                            styles.content,
                            contentStyle,
                        ]}
                    >
                        {children}
                    </Surface>
                    <View
                        style={{
                            flex: 1,
                        }}
                        pointerEvents="none"
                    >
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
        </RNModal>
    );
};

AlertDialog.defaultProps = defaultProps;

export default AlertDialog;

const styles = StyleSheet.create({
    backdrop: {

    },
    contentContainer: {
        alignItems: "center",
    },
    content: {
        marginHorizontal: 16,
    },
});
