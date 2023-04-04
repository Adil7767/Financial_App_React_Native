import { compareTime, parseFormDay, isValidTime } from "./DatetimeUtils";

const EmailMaxLength = 64;

const validators = {
    required: value => !!value,
    maxLength: (value, rule) => (value ? value.length <= rule.value : true),
    minLength: (value, rule) => (value ? value.length >= rule.value : false),
    pattern: (value, rule) => rule.value.test(value),
    patternOptional: (value, rule) =>
        value === "" ? true : rule.value.test(value),
    maximumDate: (value, rule) =>
        value && rule.value
            ? compareTime(rule.value, parseFormDay(value, rule.format)) > -1
            : true,
    minimumDate: (value, rule) =>
        value && rule.value
            ? compareTime(rule.value, parseFormDay(value, rule.format)) < 1
            : true,
    dateValid: (value, rule) => (value ? isValidTime(value, rule.format) : true),
    emailLength: value => {
        if (!value) return true;
        const values = value.split("@");
        return !(
            values[0].length > EmailMaxLength ||
            (values.length > 1 && values[1].length > EmailMaxLength)
        );
    },
    maxNumberOfEmail: (value, rule) => {
        if (!value) return true;
        const values = value.split(",");
        return values.length <= rule.value;
    },
};

export default validators;

// @ts-ignore
export const EmailRegex = /^(?=.{1,64}@)(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?!.{65})(((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
// @ts-ignore
export const MultipleEmailRegex = /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([,.](([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
// @ts-ignore
export const NumberRegex = /^[0-9]+$/;
// @ts-ignore
export const EnglishAlphabetsAndWhiteSpace = /^[A-Za-z ]+$/;
// @ts-ignore
export const Alphanumeric = /^[A-Za-z0-9]+$/;
// @ts-ignore
export const AlphanumericExtended = /^[A-Za-z .,@]+$/;
// @ts-ignore
export const ImageURLRegex = /^(http(s?):).*\.(?:jp(e?)g|jpg|gif|png)/gi;
