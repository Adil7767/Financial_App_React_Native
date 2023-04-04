import * as React from "react";
import { View } from "react-native";
import DateTimePickerWeb, { Props } from "./DateTimePicker.mweb";

const DateTimePicker = ({
    isDesktop,
    ...rest
}: Props & { isDesktop?: boolean }) => {

    if (isDesktop) {
        return (
            <View>Not support!</View>
        )
    }

    return (
        <DateTimePickerWeb
            {...rest}
        />
    )
}

export default DateTimePicker;
