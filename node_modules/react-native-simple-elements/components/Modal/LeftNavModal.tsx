import * as React from "react";
import {
    View,
    KeyboardAvoidingView,
    Modal as RNModal,
    TouchableOpacity,
    Animated,
    PanResponder,
    Platform,
    Dimensions
} from "react-native";
import Surface from "../Surface";

const windowHeight = Dimensions.get("window").height;

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
    width?: number,
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
    additionalTopSpace?: number,
    showMask?: boolean,
};

// type State = {
//     animatedHeight: Animated.Value,
//     pan: Animated.ValueXY,
//     modalVisible: boolean,
// }

const defaultProps = {
    animationType: "none",
    width: 240,
    height: windowHeight,
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
    children: <View />,
    additionalTopSpace: 0,
    showMask: false,
};

const LeftNavModal = (props: Props) => {

    const {
        width,
        animationType,
        closeOnDragDown,
        dragFromTopOnly,
        closeOnPressMask,
        closeOnPressBack,
        children,
        customStyles,
        keyboardAvoidingViewEnabled,
        openDuration,
        closeDuration,
        minClosingHeight,
        additionalTopSpace,
        onOpen,
        onClose,
        showMask,
    } = props;

    const [ visible, setVisible ] = React.useState(false);
    const animatedWidth = React.useRef(new Animated.Value(0));
    const pan = React.useRef(new Animated.ValueXY());

    const panResponder = React.useRef(undefined);

    React.useEffect(() => {
        if (!visible && props.visible) {
            setModalVisible(true, props);
        } else if (visible && !props.visible) {
            setModalVisible(false, props);
        }
    }, [ props.visible ]);

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

    const setModalVisible = (visible, props?) => {
        // const { height, minClosingHeight, openDuration, closeDuration, onClose, onOpen } = this.props;
        // const { animatedHeight, pan } = this.state;
        if (visible) {
            setVisible(visible);
            if (typeof onOpen === "function") onOpen(props);
            Animated.timing(animatedWidth.current, {
                useNativeDriver: false,
                toValue: width,
                duration: openDuration
            }).start();
        } else {
            Animated.timing(animatedWidth.current, {
                useNativeDriver: false,
                toValue: minClosingHeight,
                duration: closeDuration
            }).start(() => {
                pan.current.setValue({ x: 0, y: 0 });
                animatedWidth.current = new Animated.Value(0),
                setVisible(visible);

                // this.setState({
                //     modalVisible: visible,
                //     animatedHeight: new Animated.Value(0)
                // });

                if (typeof onClose === "function") onClose(props);
            });
        }
    };

    const createPanResponder = (props) => {
        const { closeOnDragDown, height } = props;
        // const { pan } = this.state;
        panResponder.current = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.current.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
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

    const close = (props?) => {
        setModalVisible(false, props);
    };

    // const { animatedHeight, pan } = this.state;

    if (!props.visible && !panResponder.current) {
        createPanResponder(props);
    }

    const panStyle = {
        transform: pan.current.getTranslateTransform()
    };

    return (
        <RNModal
            transparent
            animationType={animationType}
            visible={visible}

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
                        flexDirection: "row",
                    },
                    customStyles.wrapper,
                ]}
            >
                <Animated.View
                    {...(!dragFromTopOnly && panResponder.current?.panHandlers ? panResponder.current.panHandlers : {} )}
                    style={[
                        panStyle,
                        {
                            marginTop: additionalTopSpace,
                            height: windowHeight - additionalTopSpace,
                            overflow: "hidden"
                        },
                        { width: animatedWidth.current },
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
                    <Surface
                        style={{
                            flex: 1,
                        }}
                    >
                        {children}
                    </Surface>
                </Animated.View>
                {showMask ?
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            // backgroundColor: "transparent",
                            backgroundColor: "#00000077",
                        }}
                        activeOpacity={1}
                        onPress={() => (closeOnPressMask ? close() : null)}
                    />
                    :
                    <View
                        style={{
                            flex: 1,
                        }}
                        pointerEvents="box-none"
                    />
                }
            </KeyboardAvoidingView>
        </RNModal>
    );
};

LeftNavModal.defaultProps = defaultProps;

export default LeftNavModal;
