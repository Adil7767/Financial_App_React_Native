import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Appearance,
} from "react-native";
import dfSet from "date-fns/set";
import DateTimePicker from "./mweb/DateTimePicker";
import Modal from "./Modal";
import { isIphoneX } from "./utils";

export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const BORDER_COLOR_DARK = "#272729";
export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = 20;
export const HIGHLIGHT_COLOR_DARK = "#444444";
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
export const TITLE_FONT_SIZE = 20;
export const TITLE_COLOR = "#8f8f8f";

const convertValuesToDate = (cur, values, index, use12Hours) => {
    let newDate = cur;
    switch (index) {
        case 0:
            newDate = dfSet(newDate, { year: values[index] });
            break;
        case 1:
            newDate = dfSet(newDate, { month: values[index] });
            break;
        case 2:
            newDate = dfSet(newDate, { date: values[index] });
            break;
        case 3:
            newDate = dfSet(newDate, { hours: use12Hours && newDate.getHours() >= 12 ? parseInt(values[index], 10) + 12 : values[index] });
            break;
        case 4:
            newDate = dfSet(newDate, { minutes: values[index] });
            break;
        case 5:
            if (parseInt(values[index], 10) === 0) {
                newDate = dfSet(newDate, { hours: newDate.getHours() >= 12 ? newDate.getHours() - 12 : newDate.getHours() });
            } else {
                newDate = dfSet(newDate, { hours: newDate.getHours() + 12  });
            }
            break;
    }

    return newDate;
}

export type Props = {
    cancelTextIOS?: string,
    confirmTextIOS?: string,
    customCancelButtonIOS?: React.ReactElement,
    customConfirmButtonIOS?: React.ReactElement,
    customHeaderIOS?: React.ReactElement,
    customPickerIOS?: React.ReactElement,
    date?: Date,
    mode?: string,
    headerTextIOS?: string,
    modalPropsIOS?: any,
    modalStyleIOS?: any,
    isDarkModeEnabled?: boolean,
    isVisible?: boolean,
    pickerContainerStyleIOS?: any,
    onCancel: () => void,
    onConfirm: (date) => void,
    onChange?: (date) => void,
    onHide?: (flag, date?) => void,
    maximumDate?: Date,
    minimumDate?: Date,
    use12Hours?: boolean,
};

class DateTimePickerWeb extends React.PureComponent<Props> {

    static defaultProps = {
        cancelTextIOS: "Cancel",
        confirmTextIOS: "Confirm",
        modalPropsIOS: {},
        date: new Date(),
        isDarkModeEnabled: undefined,
        isVisible: false,
        pickerContainerStyleIOS: {},
        use12Hours: false,
    };

    state = {
        currentDate: this.props.date,
        isPickerVisible: this.props.isVisible,
    };

    didPressConfirm = false;

    static getDerivedStateFromProps(props, state) {
        if (props.isVisible && !state.isPickerVisible) {
            return { currentDate: props.date, isPickerVisible: true };
        }
        return null;
    }

    handleCancel = () => {
        this.didPressConfirm = false;
        this.props.onCancel();
    };

    handleConfirm = () => {
        this.didPressConfirm = true;
        this.props.onConfirm(this.state.currentDate);
    };

    handleHide = () => {
        const { onHide } = this.props;
        if (onHide) {
            onHide(this.didPressConfirm, this.state.currentDate);
        }
        this.setState({ isPickerVisible: false });
    };

    handleChange = (date, index?) => {
        if (this.props.onChange) {
            this.props.onChange(date);
        }
        this.setState({ currentDate: convertValuesToDate(this.state.currentDate, date, index, this.props.use12Hours) });
    };

    render() {
        const {
            cancelTextIOS,
            confirmTextIOS,
            // customCancelButtonIOS,
            // customConfirmButtonIOS,
            // customHeaderIOS,
            // customPickerIOS,
            // date,
            headerTextIOS,
            isDarkModeEnabled,
            isVisible,
            modalStyleIOS,
            modalPropsIOS,
            pickerContainerStyleIOS,
            // onCancel,
            // onConfirm,
            // onChange,
            // onHide,
            ...otherProps
        } = this.props;
        const isAppearanceModuleAvailable = !!(
            Appearance && Appearance.getColorScheme
        );
        const _isDarkModeEnabled =
            isDarkModeEnabled === undefined && isAppearanceModuleAvailable
                ? Appearance.getColorScheme() === "dark"
                : isDarkModeEnabled || false;

        //   const ConfirmButtonComponent = customConfirmButtonIOS || ConfirmButton;
        const ConfirmButtonComponent = ConfirmButton;
        //   const CancelButtonComponent = customCancelButtonIOS || CancelButton;
        const CancelButtonComponent = CancelButton;
        //   const HeaderComponent = customHeaderIOS || Header;
        const HeaderComponent = Header;
        //   const PickerComponent = customPickerIOS || DateTimePicker;
        const PickerComponent = DateTimePicker;


        const themedContainerStyle = _isDarkModeEnabled
            ? pickerStyles.containerDark
            : pickerStyles.containerLight;

        const headerText =
            headerTextIOS || (this.props.mode === "time"
                ? "Pick a time"
                : "Pick a date");

        return (
            <Modal
                isVisible={isVisible}
                contentStyle={[pickerStyles.modal, modalStyleIOS]}
                onBackdropPress={this.handleCancel}
                onHide={this.handleHide}
                {...modalPropsIOS}
            >
                <View
                    style={[
                        pickerStyles.container,
                        themedContainerStyle,
                        pickerContainerStyleIOS,
                    ]}
                >
                    <HeaderComponent label={headerText} />
                    <PickerComponent
                        // display="spinner"
                        {...otherProps}
                        date={this.state.currentDate}
                        // onChange={this.handleChange}
                        onValueChange={this.handleChange}
                    />
                    <ConfirmButtonComponent
                        isDarkModeEnabled={_isDarkModeEnabled}
                        onPress={this.handleConfirm}
                        label={confirmTextIOS}
                    />
                </View>
                <CancelButtonComponent
                    isDarkModeEnabled={_isDarkModeEnabled}
                    onPress={this.handleCancel}
                    label={cancelTextIOS}
                />
            </Modal>
        );
    }
}

const pickerStyles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 10,
    },
    container: {
        borderRadius: BORDER_RADIUS,
        marginBottom: 8,
        overflow: "hidden",
    },
    containerLight: {
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    containerDark: {
        backgroundColor: BACKGROUND_COLOR_DARK,
    },
});

export const Header = ({ label, style = headerStyles }) => {
    return (
        <View style={style.root}>
            <Text style={style.text}>{label}</Text>
        </View>
    );
};

export const headerStyles = StyleSheet.create({
    root: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 14,
        backgroundColor: "transparent",
    },
    text: {
        textAlign: "center",
        color: TITLE_COLOR,
        fontSize: TITLE_FONT_SIZE,
    },
});

export const ConfirmButton = ({
    isDarkModeEnabled,
    onPress,
    label,
    style = confirmButtonStyles,
}) => {
    const themedButtonStyle = isDarkModeEnabled
        ? confirmButtonStyles.buttonDark
        : confirmButtonStyles.buttonLight;

    const underlayColor = isDarkModeEnabled
        ? HIGHLIGHT_COLOR_DARK
        : HIGHLIGHT_COLOR_LIGHT;
    return (
        <TouchableHighlight
            style={[themedButtonStyle, style.button]}
            underlayColor={underlayColor}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text style={style.text}>{label}</Text>
        </TouchableHighlight>
    );
};

export const confirmButtonStyles = StyleSheet.create({
    button: {
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "transparent",
        height: 57,
        justifyContent: "center",
    },
    buttonLight: {
        borderColor: BORDER_COLOR,
    },
    buttonDark: {
        borderColor: BORDER_COLOR_DARK,
    },
    text: {
        textAlign: "center",
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: BUTTON_FONT_WEIGHT,
        backgroundColor: "transparent",
    },
});

export const CancelButton = ({
    isDarkModeEnabled,
    onPress,
    label,
    style = cancelButtonStyles,
}) => {
    const themedButtonStyle = isDarkModeEnabled
        ? cancelButtonStyles.buttonDark
        : cancelButtonStyles.buttonLight;
    const underlayColor = isDarkModeEnabled
        ? HIGHLIGHT_COLOR_DARK
        : HIGHLIGHT_COLOR_LIGHT;
    return (
        <TouchableHighlight
            style={[style.button, themedButtonStyle]}
            underlayColor={underlayColor}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text style={style.text}>{label}</Text>
        </TouchableHighlight>
    );
};

export const cancelButtonStyles = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS,
        height: 57,
        marginBottom: isIphoneX() ? 20 : 0,
        justifyContent: "center",
    },
    buttonLight: {
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    buttonDark: {
        backgroundColor: BACKGROUND_COLOR_DARK,
    },
    text: {
        padding: 10,
        textAlign: "center",
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: "600",
        backgroundColor: "transparent",
    },
});

export default DateTimePickerWeb;
