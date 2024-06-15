import authReducer from "./slices/authReducer";
import { combineReducers } from "redux";

// The key of this object will be the name of the store
const rootReducers = combineReducers({ auth : authReducer });

export default rootReducers;