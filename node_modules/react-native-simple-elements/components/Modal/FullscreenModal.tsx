import * as React from "react";
import {
    View,
    KeyboardAvoidingView,
    Modal as RNModal,
    Animated,
    PanResponder,
    Dimensions,
    Platform
} from "react-native";

const WindowHeight = Dimensions.get("window").height;

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

type Props = {
    animationType?: "none" | "slide" | "fade",
    visible: boolean,
    height?: number,
    minClosingHeight?: number,
    openDuration?: number,
    closeDuration?: number,
    closeOnDragDown?: boolean,
    closeOnPressMask?: boolean,
    dragFromTopOnly?: boolean,
    closeOnPressBack?: boolean,
    keyboardAvoidingViewEnabled?: boolean,
    customStyles?: Record<string, unknown>,
    onClose?: (evt) => void,
    onOpen?: (evt) => void,
    children?: React.ReactNode,
};

// type State = {
//     animatedHeight: Animated.Value,
//     pan: Animated.ValueXY,
//     modalVisible: boolean,
// }

const defaultProps = {
    animationType: "none",
    height: WindowHeight,
    minClosingHeight: 0,
    openDuration: 300,
    closeDuration: 200,
    closeOnDragDown: false,
    dragFromTopOnly: false,
    closeOnPressMask: true,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === "ios",
    customStyles: {},
    onClose: null,
    onOpen: null,
    children: <View />
};

const FullscreenModal = ({
    visible,
    animationType,
    closeOnDragDown,
    dragFromTopOnly,
    closeOnPressBack,
    children,
    customStyles,
    keyboardAvoidingViewEnabled,
    height,
    onOpen,
    onClose,
}: Props) => {

    const [ modalVisible, setModalVisible ] = React.useState(false);
    const pan = React.useRef(new Animated.ValueXY());

    const panResponder = React.useRef(undefined);

    React.useEffect(() => {
        if (!modalVisible && visible) {
            _setModalVisible(true);
        } else if (modalVisible && !visible) {
            _setModalVisible(false);
        }
    }, [ visible ]);

    const _setModalVisible = (visible, props?) => {
        if (visible) {
            setModalVisible(visible);
            if (typeof onOpen === "function") onOpen(props);
        } else {
            setModalVisible(visible);
            if (typeof onClose === "function") onClose(props);
        }
    };

    const createPanResponder = () => {
        panResponder.current = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.current.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    _setModalVisible(false);
                } else {
                    Animated.spring(pan.current, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            }
        });
    };

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
            visible={modalVisible}
            // @ts-ignore
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
                if (closeOnPressBack) _setModalVisible(false);
            }}
        >
            <KeyboardAvoidingView
                enabled={keyboardAvoidingViewEnabled}
                behavior="padding"
                style={[
                    {
                        flex: 1,
                        backgroundColor: "#00000077",
                    },
                    customStyles.wrapper,
                ]}
            >
                <Animated.View
                    {...(!dragFromTopOnly && panResponder.current?.panHandlers ? panResponder.current.panHandlers : {} )}
                    style={[
                        panStyle,
                        {
                            backgroundColor: "#fff",
                            width: "100%",
                            height: WindowHeight,
                            overflow: "hidden"
                        },
                        customStyles.container
                    ]}
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
                    {children}
                </Animated.View>
            </KeyboardAvoidingView>
        </RNModal>
    );
};

FullscreenModal.defaultProps = defaultProps;

export default FullscreenModal;
