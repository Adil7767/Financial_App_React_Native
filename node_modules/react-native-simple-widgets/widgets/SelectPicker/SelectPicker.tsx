import * as React from "react";
import { View } from "react-native";
import SelectPickerWeb, { Props } from "./SelectPicker.mweb";

const SelectPicker = ({
    isDesktop,
    ...rest
}: Props & { isDesktop?: boolean }) => {

    if (isDesktop) {
        return (
            <View>Not support!</View>
        )
    }

    return (
        <SelectPickerWeb
            {...rest}
        />
    )
}

export default SelectPicker;
