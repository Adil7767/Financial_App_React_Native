import * as React from "react";
import BottomSheet, { Props as BottomSheetProps} from "./BottomSheet";
import Surface from "../Surface";
import { FlexItem } from "../Container";
import CloseIcon from "@mdi/svg/svg/close.svg";
import IconButton from "../IconButton";
import Button from "../Button";

type RefProps = {
    open: ({ onConfirm, onCancel }) => void,
    close: () => void,
}

type TranslationProps = {
    cancelText: string,
    confirmText: string,
}

type Props = Omit<BottomSheetProps, "visible" | "onDismiss"> & {
    innerRef: React.RefObject<RefProps>,
    title?: string,
    translations?: TranslationProps,
};

const defaultProps = {
    translations: {
        confirmText: "Done",
    },
};

const BottomSheetWithRef = ({
    innerRef,
    children,
    title,
    translations,
    ...rest
}: Props) => {

    const [ visible, setVisible ] = React.useState(false);
    const optionsRef = React.useRef({} as any);

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
        <BottomSheet
            visible={visible}
            onDismiss={_handleDismiss}
            {...rest}
        >
            <Surface>
                <FlexItem
                    title={title}
                    left={() => (
                        <IconButton
                            icon={CloseIcon}
                            onPress={_handleDismiss}
                        />
                    )}
                    right={() => (
                        <Button
                            onPress={_handleConfirm}
                        >
                            {translations.confirmText}
                        </Button>
                    )}
                    rowStyle={{
                        alignItems: "center",
                    }}
                />
                {children}
            </Surface>
        </BottomSheet>
    );
};

BottomSheetWithRef.defaultProps = defaultProps;

export default BottomSheetWithRef;
