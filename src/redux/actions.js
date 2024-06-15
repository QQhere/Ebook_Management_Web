export const saveLoginInfor = payload => {
    console.log("saveLoginInfor: ", payload);
    return {
        type: 'SAVE_LOGIN_INFOR',
        payload
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
}