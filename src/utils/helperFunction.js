import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: message
        // : 'server error'
    })
}
const showError2 = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: ' Password and confirm Password not match'
        // : 'server error'
    })
}
const showError3 = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: ' plz enter email'
        // : 'server error'
    })
}
const showError4 = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: message,
        // : 'server error'
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message: message
    })
}

export {
    showError,
    showError2,
    showError3,
    showError4,
    showSuccess
}