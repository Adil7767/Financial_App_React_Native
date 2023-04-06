import { LOGIN, SIGNUP, PROFILE, CHANGE_PASSWORD, SEND_RESET_PASSWORD_EMAIL, RESET_PASSWORD } from "../../config/urls";
import { apiPost, clearUserData, setUserData } from "../../utils/utils";
import store from "../store";
import types from "../types";

const { dispatch } = store


export const saveUserData = (data) => {
    // const dispatch = useDispatch();
    // const tkn = useSelector((state) => state)
    // var token = tkn.user.token
    // console.log('mytoken', token)
    dispatch({
        type: types.LOGIN,
        payload: data,
    },

    )
}

export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            // if (res.data.emailVerified) {
            if (res.data) {
                setUserData(res.data).then(() => {
                    resolve(res)
                    saveUserData(res.data)
                });
                // console.log('userdata auth.js', res.data)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function signup(data) {
    return apiPost(SIGNUP, data)

}
export function resetmail(data) {
    return apiPost(SEND_RESET_PASSWORD_EMAIL, data)
}
export function resetpassword(data) {
    return apiPost(RESET_PASSWORD, data)
}
export function changepassword(data, headers) {
    return apiPost(CHANGE_PASSWORD, data, headers)
}
export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE })
    clearUserData()
}
export function profile() {
    dispatch({ type: types.PROFILE })

}
