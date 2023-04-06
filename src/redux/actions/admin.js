import { TYPE, CATEGORY, PAYMENT, TRANSACTION, TOTAL_TRANSACTION } from "../../config/urls";
import { apiPost, apiDelete, apiGet, apiPut } from "../../utils/utils";

export function typepost(data) {
    return apiPost(TYPE, data, headers)

}
export function typeget(data) {
    return apiGet(TYPE, data, headers)

}
export function typedelete(data) {
    return apiDelete(TYPE, data, headers)

}
export function typeput(data) {
    return apiPut(TYPE, data, headers)

}
export function category(data) {
    return apiPost(CATEGORY, data, headers)
}
export function payment(data) {
    return apiPost(PAYMENT, data, headers)
}
export function transaction(data, headers) {
    return apiPost(TRANSACTION, data, headers,)
}
export function total_transaction(data, headers) {
    return apiPost(TOTAL_TRANSACTION, data, headers,)
}

