import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../../services/api/User";

const initialState = {
    acess_token: '',
    refresh_token: '',
}

const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        logInSuccess(state, action) {
            state.acess_token = action.payload.acess_token;
            state.refresh_token = action.payload.refresh_token;
        }
    }
});

const { logInSuccess } = logInSlice.actions;

export const logInSl = ({phoneNumber, password}) => async dispatch => {
    const response = await logIn(phoneNumber, password);
    // dispatch(logInSuccess(response));
    if (response.status === 200) {
        dispatch(logInSuccess(response.data));
    }
    else {
        throw new Error(response.data.message);
    }
}

export default logInSlice.reducer;
