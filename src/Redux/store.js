import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth/authReducer";


const reducer = combineReducers({auth : authReducer})

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store