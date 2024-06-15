const initialState = {
    isLoggedIn: false,
    token: '',
    refresh_token: '',
    userId: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_LOGIN_INFOR':
            return {
                isLoggedIn: true,
                token: action.payload.token,
                refresh_token: action.payload.refresh_token,
                userId: action.payload.user_id
            }
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                token: '',
                refresh_token: '',
                userId: ''
            }
        default:
            return state;
    }
}

export default authReducer;