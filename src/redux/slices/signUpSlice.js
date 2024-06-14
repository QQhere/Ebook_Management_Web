import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../../services/api/User";

const initialState = {
    message: '',
    status: '',
    data: {},
}

const SignUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        signUpSuccess(state, action) {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.data = action.payload.data;
        }
    }
});

const { signUpSuccess } = SignUpSlice.actions;

export const signUpSl = ({fullName, phoneNumber, password, confirmPassword}) => async dispatch => {
    const response = await signUp(fullName, phoneNumber, password, confirmPassword);
    console.log(response);
    dispatch(signUpSuccess(response));
}

export default SignUpSlice.reducer;
