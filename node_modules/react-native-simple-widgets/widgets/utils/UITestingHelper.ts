import { Platform } from "react-native";

export const testProp = id => {
    return process.env.NODE_ENV != "production"
        ? Platform.OS === "android"
            ? { accessibilityLabel: id }
            : { testID: id }
        : {};
};

export const fullTestProps = id => {
    return process.env.NODE_ENV != "production"
        ? { accessibilityLabel: id, testID: id }
        : {};
};

export const toSnakeCase = value =>
    value
        ? String(value)
            .toLowerCase()
            .replace(/[\W_]+/g, "_")
        : "";
