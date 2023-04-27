export const API_BASE_URL = "https://a3a5-39-53-111-182.ngrok-free.app/api/";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('login/')
export const SIGNUP = getApiUrl('register/')
export const PROFILE = getApiUrl('profile/')
export const CHANGE_PASSWORD = getApiUrl('change-password/')
export const SEND_RESET_PASSWORD_EMAIL = getApiUrl('send-reset-password-email/');
export const RESET_PASSWORD = getApiUrl('reset-password/');
export const TYPE = getApiUrl('type/');
export const CATEGORY = getApiUrl('category/');
export const PAYMENT = getApiUrl('payments/');
export const TRANSACTION = getApiUrl('transaction/');
export const TOTAL_TRANSACTION = getApiUrl('total-transaction/');








