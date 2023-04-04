import * as React from "react";
import IDatePickerProps from "./IDateTimePickerProps";
import PopupPicker from "../../SelectPicker/mweb/Popup";
import { IPopupPickerProps } from "../../SelectPicker/mweb/PopupPickerTypes";

export interface IPopupDatePickerProps extends IPopupPickerProps {
    datePicker: React.ReactElement<IDatePickerProps>;
    onChange?: (date?: any) => void;
    date?: any;
}

class PopupDatePicker extends React.Component<IPopupDatePickerProps, any> {

    static defaultProps = {
        pickerValueProp: "date",
        pickerValueChangeProp: "onDateChange",
    };

    onOk = (v) => {
        const { onChange, onOk } = this.props;
        if (onChange) {
            onChange(v);
        }
        if (onOk) {
            onOk(v);
        }
    }

    render() {
        return (
            <PopupPicker
                picker={this.props.datePicker}
                value={this.props.date}
                {...this.props}
                onOk={this.onOk}
            />
        );
    }
}

export default PopupDatePicker;
