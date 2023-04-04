export const API_BASE_URL = "https://d8b3-103-153-39-9.in.ngrok.io//api/";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('login/')
export const SIGNUP = getApiUrl('register/')
export const PROFILE = getApiUrl('profile/')
export const CHANGE_PASSWORD = getApiUrl('change-password/')
export const SEND_RESET_PASSWORD_EMAIL = getApiUrl('send-reset-password-email/');
export const RESET_PASSWORD = getApiUrl('reset-password/');



