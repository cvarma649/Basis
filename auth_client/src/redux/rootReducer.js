import { combineReducers } from "redux";
import user_reducer from "./User/user_reducer";

const rootReducer=combineReducers({
    user_reducer:user_reducer
})

export default rootReducer;