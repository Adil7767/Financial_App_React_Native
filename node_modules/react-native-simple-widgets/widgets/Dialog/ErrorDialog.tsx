import * as React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import AlertDialog from "react-native-simple-elements/components/AlertDialog";
import Button from "react-native-simple-elements/components/Button";
import { DialogActions, DialogContent, DialogTitle } from "react-native-simple-elements/components/Dialog";
import Text from "react-native-simple-elements/components/Text";
import { ThemeContext } from "styled-components";

type RefProps = {
    open: (opts) => void,
    close: () => void,
};

type TranslationProps = {
    confirmText: string,
}

type Props = Omit<React.ComponentProps<typeof AlertDialog>, "visible" | "onDismiss"> & {
    innerRef: React.RefObject<RefProps>,
    title?: string,
    message?: string,
    translations?: TranslationProps,
    dialogContentStyle?: StyleProp<ViewStyle>,
    messageStyle?: StyleProp<TextStyle>,
}

const defaultProps = {
    translations: {
        confirmText: "Ok",
    },
};

const ErrorDialog = ({
    innerRef,
    children,
    title,
    message,
    translations,
    dialogContentStyle,
    messageStyle,
    ...rest
}: Props) => {
    const [ visible, setVisible ] = React.useState(false);
    const optionsRef = React.useRef<any>({});

    const { colors } = React.useContext(ThemeContext);

    React.useImperativeHandle(innerRef, () => ({
        open: (opts) => {
            optionsRef.current = {
                onConfirm: opts?.onConfirm,
            };
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        },
    }));

    const _handleConfirm = () => {
        if (optionsRef && optionsRef.current && optionsRef.current.onConfirm) {
            optionsRef.current.onConfirm();
        }
        innerRef.current.close();
    };

    const _handleDismiss = () => {
        innerRef.current.close();
    };

    return (
        <AlertDialog
            visible={visible}
            onDismiss={_handleDismiss}
            contentStyle={{

            }}
            {...rest}
        >
            {title ?
                <DialogTitle>{title}</DialogTitle>
                :
                null
            }
            <DialogContent
                style={[
                    styles.dialogContentStyle,
                    dialogContentStyle,
                ]}
            >
                {message ?
                    <Text
                        style={[
                            messageStyle,
                            {
                                color: colors.error,
                            },
                        ]}
                    >
                        {message}
                    </Text>
                    :
                    children
                }
            </DialogContent>
            <DialogActions>
                <Button
                    mode="contained"
                    onPress={_handleConfirm}
                >
                    {translations?.confirmText}
                </Button>
            </DialogActions>
        </AlertDialog>
    );
};

ErrorDialog.defaultProps = defaultProps;

export default ErrorDialog;

const styles = StyleSheet.create({
    dialogContentStyle: {
        paddingHorizontal: 16,
    },
});
