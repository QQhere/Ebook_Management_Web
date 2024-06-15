const initialState = {
    isLoggedIn: false,
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_LOGIN_INFOR':
            return {
                isLoggedIn: true,
                token: action.payload.token
            }
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                token: ''
            }
        default:
            return state;
    }
}

export default authReducer;