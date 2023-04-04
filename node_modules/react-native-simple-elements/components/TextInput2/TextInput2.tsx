import * as React from "react";
import {
    Text,
    View,
    TextInput,
    Animated,
    Easing,
    Platform,
    StyleSheet,
    ViewStyle,
    StyleProp,
    TextStyle,
    TextInputProps,
} from "react-native";
import { ThemeContext } from "styled-components";
import { renderNode } from "../helpers";
import { SvgIcon } from "../Icon";

const renderText = (content: any, defaultProps: any, style: StyleProp<any>) =>
    renderNode(Text, content, {
        ...defaultProps,
        style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
    });

export type InputProps = React.ComponentPropsWithRef<typeof TextInput> & {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    disabledInputStyle?: StyleProp<TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    leftIcon?: React.ReactElement;
    leftIconContainerStyle?: StyleProp<ViewStyle>;
    rightIcon?: React.ReactElement;
    rightIconContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    InputComponent?: React.ComponentType | React.ForwardRefExoticComponent<any>;
    errorProps?: Record<string, any>;
    errorStyle?: StyleProp<TextStyle>;
    errorMessage?: string;
    label?: string | React.ReactNode;
    labelStyle?: StyleProp<TextStyle>;
    labelProps?: Record<string, any>;
    renderErrorMessage?: boolean;
};

export class Input extends React.Component<
    InputProps
> {
    static displayName = "Input";
    static contextType = ThemeContext as any;

    input: any;
    shakeAnimationValue = new Animated.Value(0);

    focus(): void {
        this.input.focus();
    }

    blur(): void {
        this.input.blur();
    }

    clear(): void {
        this.input.clear();
    }

    isFocused(): boolean {
        return this.input.isFocused();
    }

    setNativeProps(nativeProps: Partial<TextInputProps>): void {
        this.input.setNativeProps(nativeProps);
    }

    shake = () => {
        const { shakeAnimationValue } = this;
        shakeAnimationValue.setValue(0);
        // Animation duration based on Material Design
        // https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
        Animated.timing(shakeAnimationValue, {
            duration: 375,
            toValue: 3,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const {
            containerStyle,
            disabled,
            disabledInputStyle,
            inputContainerStyle,
            leftIcon,
            leftIconContainerStyle,
            rightIcon,
            rightIconContainerStyle,
            InputComponent = TextInput,
            inputStyle,
            errorProps,
            errorStyle,
            errorMessage,
            label,
            labelStyle,
            labelProps,
            renderErrorMessage = true,
            style,
            ...attributes
        } = this.props;

        const translateX = this.shakeAnimationValue.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
            outputRange: [0, -15, 0, 15, 0, -15, 0],
        });

        const hideErrorMessage = !renderErrorMessage && !errorMessage;

        return (
            <View
                testID="input__view-wrapper"
                style={StyleSheet.flatten([styles.container, containerStyle])}
            >
                {renderText(
                    label,
                    { style: labelStyle, ...labelProps },
                    {
                        fontSize: 16,
                        color: this.context.colors.surface,
                        ...Platform.select({
                            android: {
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                                // ...fonts.android.bold,
                            },
                            default: {
                                fontWeight: "bold",
                            },
                        }),
                    }
                )}

                <Animated.View
                    style={StyleSheet.flatten([
                        {
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            alignItems: "center",
                            borderColor: this.context.colors.surface,
                        },
                        inputContainerStyle,
                        { transform: [{ translateX }] },
                    ])}
                >
                    {leftIcon && (
                        <View
                            style={StyleSheet.flatten([
                                styles.iconContainer,
                                leftIconContainerStyle,
                            ])}
                        >
                            {renderNode(SvgIcon, leftIcon)}
                        </View>
                    )}

                    <InputComponent
                        testID="input__text-input"
                        underlineColorAndroid="transparent"
                        editable={!disabled}
                        ref={(ref: any) => {
                            this.input = ref;
                        }}
                        style={StyleSheet.flatten([
                            {
                                color: this.context.colors?.black,
                                fontSize: 18,
                                flex: 1,
                                minHeight: 40,
                            },
                            inputStyle,
                            disabled && styles.disabledInput,
                            disabled && disabledInputStyle,
                            style,
                        ])}
                        placeholderTextColor={this.context.colors?.surface}
                        {...attributes}
                    />

                    {rightIcon && (
                        <View
                            style={StyleSheet.flatten([
                                styles.iconContainer,
                                rightIconContainerStyle,
                            ])}
                        >
                            {renderNode(SvgIcon, rightIcon)}
                        </View>
                    )}
                </Animated.View>

                <Text
                    {...errorProps}
                    style={StyleSheet.flatten([
                        {
                            margin: 5,
                            fontSize: 12,
                            color: this.context.colors.error,
                        },
                        errorStyle && errorStyle,
                        hideErrorMessage && {
                            height: 0,
                            margin: 0,
                            padding: 0,
                        },
                    ])}
                >
                    {errorMessage}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
    },
    disabledInput: {
        opacity: 0.5,
    },
    iconContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 4,
        marginVertical: 4,
    },
});
