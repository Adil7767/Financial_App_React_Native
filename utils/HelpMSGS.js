import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: ("Server Error")
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message: ("Register Successfully")
    })
}
const showSuccess2 = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message: ("Login Successfully")
    })
}
const showSuccess3 = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message: ("Password Reset Successfully")
    })
}
const showSuccess4 = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message: ("Plz Check Your mail")
    })
}

export {
    showError,
    showSuccess,
    showSuccess2,
    showSuccess3,
    showSuccess4,
}