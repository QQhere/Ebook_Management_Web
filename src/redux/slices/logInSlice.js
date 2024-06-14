import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../../services/api/User";

const initialState = {
    message: '',
    status: '',
    data: {},
}

const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        logInSuccess(state, action) {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.data = action.payload.data;
        }
    }
});

const { logInSuccess } = logInSlice.actions;

export const logInSl = ({phoneNumber, password}) => async dispatch => {
    const response = await logIn(phoneNumber, password);
    dispatch(logInSuccess(response));
}

export default logInSlice.reducer;
