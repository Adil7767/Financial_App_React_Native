import * as React from "react";
import {
    StyleProp,
    StyleSheet, TextStyle, ViewStyle,
} from "react-native";
import AlertDialog, { Props as BottomSheetProps} from "./AlertDialog";
import Surface from "../Surface";
import { DialogTitle, DialogContent, DialogActions } from "../Dialog";
import Button from "../Button";
import { ThemeContext } from "styled-components";
import Text from "../Text";

type RefProps = {
    close: () => void,
}

type TranslationProps = {
    cancelText: string,
    confirmText: string,
}

type Props = Omit<BottomSheetProps, "visible" | "onDismiss"> & {
    innerRef: React.RefObject<RefProps>,
    mode?: "message" | "confirm" | "error",
    title?: string,
    message?: string,
    translations?: TranslationProps,
    dialogContentStyle?: StyleProp<ViewStyle>,
    messageStyle?: StyleProp<TextStyle>,
};

const defaultProps = {
    mode: "message",
    translations: {
        confirmText: "Ok",
        cancelText: "Cancel",
    },
};

const AlertDialogWithRef = ({
    innerRef,
    children,
    mode,
    title,
    message,
    translations,
    dialogContentStyle,
    messageStyle,
    ...rest
}: Props) => {

    const [ visible, setVisible ] = React.useState(false);
    const optionsRef = React.useRef({} as any);

    const { colors } = React.useContext(ThemeContext);

    React.useImperativeHandle(innerRef, () => ({
        open: (options) => {
            optionsRef.current = {
                onConfirm: options?.onConfirm,
                onCancel: options?.onCancel,
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
            animationType={"fade"}
            visible={visible}
            onDismiss={_handleDismiss}
            {...rest}
        >
            <Surface>
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
                                mode === "error" && styles.errorMessage,
                                mode === "error" && {
                                    color: colors.error,
                                },
                                messageStyle,
                            ]}
                        >
                            {message}
                        </Text>
                        :
                        children
                    }
                </DialogContent>
                <DialogActions>
                    {mode === "confirm" ?
                        <Button
                            onPress={_handleDismiss}
                        >
                            {translations?.cancelText}
                        </Button>
                        :
                        null
                    }
                    <Button
                        onPress={_handleConfirm}
                    >
                        {translations?.confirmText}
                    </Button>
                </DialogActions>
            </Surface>
        </AlertDialog>
    );
};

AlertDialogWithRef.defaultProps = defaultProps;

export default AlertDialogWithRef;

const styles = StyleSheet.create({
    dialogContentStyle: {
        paddingHorizontal: 16,
    },
    errorMessage: {
    },
});
