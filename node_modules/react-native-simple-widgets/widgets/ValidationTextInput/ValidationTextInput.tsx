import * as React from "react";
import TextInput from "react-native-simple-elements/components/TextInput";
import HelperText from "react-native-simple-elements/components/HelperText";
import MaskInput from "../MaskInput";

type Props = {
    label?: string,
    value: string;
    onChange: (text, opts1?, opts2?) => void;
    placeholder?: string;
    errorMessage?: string;
    secureTextEntry?: boolean;
    masked?: boolean,
    mask?: string,
    [key: string]: any;
};

const defaultProps = {
    secureTextEntry: false,
    masked: false,
};

const ValidationTextInput = (props: Props) => {
    const {
        label,
        value,
        onChange,
        placeholder,
        errorMessage,
        secureTextEntry,
        masked,
        mask,
        ...rest
    } = props;

    return (
        <>
            {masked ?
                <MaskInput
                    label={label}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    mask={mask}
                    {...rest}
                /> :
                null
            }
            {!masked ?
                <TextInput
                    label={label}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    {...rest}
                /> :
                null
            }
            <HelperText type="error" visible={!!errorMessage}>
                {errorMessage}
            </HelperText>
        </>
    );
};

ValidationTextInput.defaultProps = defaultProps;

export default ValidationTextInput;
