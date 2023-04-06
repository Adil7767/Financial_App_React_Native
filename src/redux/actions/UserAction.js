export function RESET_PASSWORD(payload) {
    return { type: "RESET_PASSWORD", payload }
}
export function setdata(payload) {
    return { type: "setdata", payload }
}

export function AddTransaction(payload) {
    return { type: "Add", payload }
}
export function RemoveTransaction() {
    return { type: "Remove" }
}
export function registerUser(user) {
    return { type: 'REGISTER_USER', payload: user };
};
// export {
//     RESET_PASSWORD,
//     RemoveTransaction,
//     AddTransaction,
//     registerUser,
//     setdata,

// }
