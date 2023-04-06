import validator from 'is_js';
import { showError2 } from './helperFunction';

const checkEmpty = (val, key) => {
    if (validator.empty(val.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (val, minLength, key) => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`
    } else {
        return '';
    }
}

export default function (data) {
    const { first_name, last_name, phone_number, email, previous_password, password, confirm_password } = data

    if (first_name !== undefined) {
        let emptyValidationText = checkEmpty(first_name, 'Please enter your First Name')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(first_name, 3, 'Please enter your fill correctly fisrt  name')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }
    if (last_name !== undefined) {
        let emptyValidationText = checkEmpty(last_name, 'Please enter your Last Name')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(last_name, 3, 'Please enter your fill correctly last  name')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    if (phone_number !== undefined) {
        let emptyValidationText = checkEmpty(phone_number, 'Please enter your Phone Number')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(phone_number, 11, 'Please enter your fill correctly Phone Number')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Please enter your email')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return 'Please enter valid email'
            }
        }
    }
    if (previous_password !== undefined) {
        let emptyValidationText = checkEmpty(previous_password, 'Please enter your previous_password')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(previous_password, 4, 'password')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    // if (password == confirm_password) {
    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Please enter your password')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(password, 4, 'password')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }
    if (confirm_password !== undefined) {
        let emptyValidationText = checkEmpty(confirm_password, 'Please enter your confirm password')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(confirm_password, 4, 'password')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }
}
//     else {
//         showError2()
//     }
// }

