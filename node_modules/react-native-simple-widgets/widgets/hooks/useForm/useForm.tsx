import * as React from "react";
import validators from "../../utils/Validator";

const defaultFunc = () => true;

// If the initial value is not empty, it should be touched to show the green check mark
const getInitialTouched = initialValues => {
    return Object.keys(initialValues).reduce((value, key) => {
        return {
            ...value,
            [key]: !!initialValues[key],
        };
    }, {});
};

const ValidateOnEvent = {
    ValidateOnChange: "validateOnChange",
    ValidateOnBlur: "validateOnBlur",
};

const useForm = (
    initialValues = {},
    onSubmit,
    validationSchema = {},
    options = {} as any,
) => {
    const {
        onChange = defaultFunc,
        onBlur = defaultFunc,
        onFocus = defaultFunc,
    } = options;
    const [values, setValues] = React.useState(initialValues);
    const [touched, setTouched] = React.useState(getInitialTouched(initialValues));
    const [errors, setErrors] = React.useState({});
    const [hasMissingField, setHasMissingField] = React.useState(false);

    React.useEffect(() => {
        setHasMissingField(
            Object.keys(errors).some(key => isRequiredError(errors[key]))
        );
    }, [errors]);

    const handleSubmit = () => {
        touchAllFields();
        const errors = validateAllFields();
        setErrors(errors);

        // If there is no errors, submit value else abort
        if (!Object.keys(errors).some(key => errors[key].error)) {
            onSubmit && onSubmit(values);
            return values;
        }
    };

    const handleChange = name => value => {
        runFieldLevelValidations(ValidateOnEvent.ValidateOnChange)(name, value);
        setFieldValue(name, value);
        onChange(name, value);
    };

    const handleBlur = name => () => {
        runFieldLevelValidations(ValidateOnEvent.ValidateOnBlur)(
            name,
            values[name]
        );
        setTouched(previousTouched => ({ ...previousTouched, [name]: true }));

        if (typeof onBlur === "function") {
            onBlur(name, values[name]);
        }
    };

    const handleFocus = name => () => {
        if (typeof onFocus === "function") {
            onFocus(name, values[name]);
        }
    };

    const validatorOnEvent = (name, rule, validatorEvent) => {
        const { [validatorEvent]: validatorFlag = true } = rule;
        return (
            validatorFlag ||
            (touched[name] &&
                errors[name] &&
                errors[name].error &&
                !isRequiredError(errors[name]))
        );
    };

    const isRequiredError = ({ error, type }) => error && type === "required";

    const validateByFieldName = (name, value = "", validatorEvent?) => {
        let error = {};
        const fieldValidatorSchema = validationSchema[name];
        const skipValidations =
            fieldValidatorSchema?.optional && value.trim() === "";

        if (skipValidations) {
            return { [name]: { error: false } };
        }

        fieldValidatorSchema &&
            Object.keys(fieldValidatorSchema).some(key => {
                const validator = validators[key];

                // ignore invalid validation props
                if (!validator) return false;

                const rule = fieldValidatorSchema[key];
                if (!validatorOnEvent(name, rule, validatorEvent)) {
                    return false;
                }

                const isValid = validator(value, rule);

                error = {
                    ...error,
                    [name]: {
                        error: !isValid,
                        errorMsg: rule.message,
                        type: key,
                    },
                };

                return !isValid;
            });

        return error;
    };

    const validateAllFields = () => {
        return Object.keys(validationSchema).reduce((value, key) => {
            const error = validateByFieldName(key, values[key]);
            return {
                ...value,
                ...error,
            };
        }, {});
    };

    const runFieldLevelValidations = validatorEvent => (name, value = "") => {
        const error = validateByFieldName(name, value, validatorEvent);
        setErrors(previousErrors => ({ ...previousErrors, ...error }));
    };

    const touchAllFields = () => {
        const touched = Object.keys(values).reduce((value, key) => {
            return {
                ...value,
                [key]: true,
            };
        }, {});
        setTouched(touched);
    };

    // Shorthand to pass appropriate props to FieldValidator component
    const createValidationProps = name => {
        return {
            name,
            touched,
            value: values[name],
            onChange: handleChange(name),
            onBlur: handleBlur(name),
            onFocus: handleFocus(name),
            values,
            errors,
        };
    };

    const setFieldValue = React.useCallback((name, value, untouched = false) => {
        setValues(previousValues => ({ ...previousValues, [name]: value }));
        if (untouched === true) {
            setTouched(touched => ({
                ...touched,
                [name]: false,
            }));
            setErrors(errors => ({
                ...errors,
                [name]: false,
            }));
        }
    }, []);

    const resetForm = React.useCallback(
        (initial = {}) => {
            setValues(initial);
            setErrors({});
            setTouched(getInitialTouched(initial));
            // eslint-disable-next-line
        }, [setValues]);

    return {
        values,
        errors,
        touched,
        hasMissingField,
        setFieldValue,
        handleChange,
        handleBlur,
        handleFocus,
        handleSubmit,
        createValidationProps,
        resetForm,
    };
};

export default useForm;
