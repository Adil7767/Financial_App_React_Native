const RESET_PASSWORD = (payload) => {
    return { type: "RESET_PASSWORD", payload }
}
const setdata = (payload) => {
    return { type: "setdata", payload }
}

const AddTransaction = (payload) => {
    return { type: "Add", payload }
}
const RemoveTransaction = () => {
    return { type: "Remove" }
}
const registerUser = user => {
    return { type: 'REGISTER_USER', payload: user };
};
export {
    RESET_PASSWORD,
    RemoveTransaction,
    AddTransaction,
    registerUser,
    setdata,

}
