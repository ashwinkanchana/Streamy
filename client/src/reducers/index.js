import { combineReducers } from "redux";
import authReducer from "./authReducer";
import streamsReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    streams: streamsReducer
})